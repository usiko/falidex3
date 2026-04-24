import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AppConfigService } from '../config/app.config.service';

export const httpInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>, 
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const configService = inject(AppConfigService);
    const tokenHeader = configService.getConfig()?.tokenHeader || 'X-Token';
    const dataBaseUrl = configService.getConfig()?.urls.dataServer;
    const tokenPath = configService.getConfig()?.paths.token;
    
    // Si la requête ne commence pas par dataBaseUrl, on laisse passer sans modification
    if (!dataBaseUrl || !request.url.startsWith(dataBaseUrl)) {
        return next(request);
    }
    
    // Si c'est la requête pour obtenir le token, on laisse passer sans le header (sinon boucle infinie)
    const tokenUrl = dataBaseUrl && tokenPath ? `${dataBaseUrl}/${tokenPath}` : null;
    if (tokenUrl && request.url === tokenUrl) {
        return next(request);
    }
    
    // Sinon, on applique la logique d'authentification
    return authService.getToken().pipe(
        switchMap(token => {
            // Cloner la requête avec le token dans le header configuré
            const clonedRequest = token 
                ? request.clone({ headers: request.headers.set(tokenHeader, token) })
                : request;
            
            return next(clonedRequest).pipe(
                catchError((error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        // Vérifier si l'erreur correspond à 'Missing X-Token header'
                        if (error.error?.error === 'UNAUTHORIZED' && 
                            (error.error?.message === 'Missing X-Token header'|| error.error?.message === 'Invalid or expired token')) {
                            console.error('🔒 Erreur détectée: Token X-Token manquant, retry...', {
                                url: request.url,
                                status: error.status
                            });
                            
                            // Refaire getToken() et retry la requête
                            return authService.authToken().pipe(
                                switchMap(()=>{
                                    return authService.getToken()
                                }),
                                switchMap(newToken => {
                                    if(!newToken)
                                    {
                                        console.error("no token")
                                        return throwError(() => "no token")
                                    }
                                    const retryRequest = newToken
                                        ? request.clone({ headers: request.headers.set(tokenHeader, newToken) })
                                        : request;
                                    return next(retryRequest);
                                })
                            );
                        }
                    }
                    return throwError(() => error);
                })
            );
        })
    );
};
