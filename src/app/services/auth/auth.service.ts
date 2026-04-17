import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, forkJoin, from, Observable, of, throwError, timer } from 'rxjs';
import { catchError, tap, retry, map, switchMap, timestamp, mergeMap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { HttpDataCollectionService } from '../data-store/http-data/http-data-collection.service';
import { EventService } from '../event/event.service';
import { StorageService } from '../storage/storage.service';

// Déclaration pour accéder aux variables d'environnement
declare const process: any;

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private http= inject(HttpClient);
    private configService= inject(ConfigService);
    private storageService= inject(StorageService);
    private httpData=inject(HttpDataCollectionService);
    private eventService=inject(EventService);


    private token:{
        value:string,
        date:Date
    }|undefined;

    login() {
        const login = 'user';
        const password = 'password';
        const url = this.configService.getConfig()?.urls?.dataServer;
        return of({ access_token: 'test'})
        //return throwError(null);
        return this.http
            .post<{ access_token: string }>(url + '/auth/login', {
                username: 'john',
                password: 'changeme',
            })
            .pipe(
                tap((data) => {
                    this.setToken(data.access_token);
                }),
                catchError((error) => {
                    const isAllStored = this.httpData.isAllStored();
                    if (!isAllStored)
                    {
                        this.setToken(undefined);
                        return throwError(error);
                    }
                    else {
                        return of(null);
                    }
                    
                })
            );
    }

    private setToken(token: string|undefined):void {
        
       if(token)
       {
        const data = {
            value:token,
            date:new Date()
        }
        this.storageService.set("token",data,"date").subscribe()
       }
       else{
        this.storageService.remove("token").subscribe()
       }
    }

    getToken(): Observable<string|undefined> {
       return this.storageService.get("token",undefined,'date', 23 * 60 * 60 * 1000).pipe(
         switchMap((data:{value:string,date:Date}|undefined)=>{
           const token = data?.value;
           // Si on a un token, on le retourne
           if(token) {
             return of(token);
           }
           // Sinon, on fait authToken() puis on retourne le nouveau token
           return this.authToken().pipe(
             switchMap(() => this.storageService.get("token",undefined,'date', 23 * 60 * 60 * 1000)),
             map((newData:{value:string,date:Date}|undefined) => newData?.value)
           );
         })
       )
    }

    authToken()
    {
        const url = this.configService.getConfig()?.urls?.dataServer;
        const tokenPath = this.configService.getConfig()?.paths?.token;
        if(url && tokenPath)
        {
        const fullUrl =  `${url}/${tokenPath}`;
        const role = 'visitor';
        const timestamp = Date.now();
        return from(this.getHashToken(role,timestamp)).pipe(mergeMap((hash:string)=>{
                    return this.http.post<{token:string}>(fullUrl,{role,timestamp,hash}).pipe(
            tap((result)=>{
                this.setToken(result.token);
            }),
            retry({
                count: 3,
                delay: (error, retryCount) => {
                    // Vérifier si c'est l'erreur spécifique "Invalid or expired token"
                    if (error instanceof HttpErrorResponse && 
                        error.error?.error === 'UNAUTHORIZED' && 
                        error.error?.message === 'Invalid or expired token') {
                        console.log(`⚠️ Token invalide ou expiré, tentative ${retryCount}/3...`);
                        // Attendre 1 seconde avant de réessayer
                        return timer(1000);
                    }
                    // Si ce n'est pas l'erreur attendue, propager l'erreur immédiatement
                    return throwError(() => error);
                }
            }),
            catchError((error) => {
                console.error('❌ Échec définitif de authToken après plusieurs tentatives', error,fullUrl);
                return throwError(() => error);
            }),
            map(()=>{
                return void 0;
            })
        );
        }))

        }
        else{
            return throwError(()=>'no url')
        }

    }

    /**
     * Récupère la clé secrète pour le hash du token depuis les variables d'environnement
     */
    private getTokenHashKey(): string {
       // Récupérer depuis process.env avec un fallback
       return this.configService.getConfig()?.tokenKey??'default_dev_token_hash_please_change'
    }

    /**
     * Génère un hash SHA256 identique à celui du serveur
     * Format: SHA256(role|secret|timestamp)
     */
    async getHashToken(role: string, timestamp: number): Promise<string> {
        const secret = this.getTokenHashKey();
        const data = `${role}|${secret}|${timestamp}`;
        
        // Encoder la chaîne en bytes
        const encoder = new TextEncoder();
        const dataBytes = encoder.encode(data);
        
        // Calculer le hash SHA256
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes);
        
        // Convertir le buffer en string hexadécimal
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
}
