import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConfigService<T> {
    private config: T|undefined;
    private configUrl = 'assets/config/config.json';
    private http = inject(HttpClient);
    loadConfig(paths: string[]): Observable<void> {
        if (!paths || paths.length === 0) {
            return of(undefined).pipe(map(() => {}));
        }

        // Premier path: type T complet
        const firstPath$ = this.http.get<T>(paths[0]);

        // Si un seul path, on retourne directement
        if (paths.length === 1) {
            return firstPath$.pipe(
                map((value: T) => {
                    this.config = value;
                })
            );
        }

        // Paths suivants: type Partial<T>
        const remainingPaths$ = paths.slice(1).map(path => 
            this.http.get<Partial<T>>(path).pipe(catchError(()=>{
                return of({})
            }))
        );

        // Charger le premier, puis fusionner avec les suivants
        return firstPath$.pipe(
            mergeMap((baseConfig: T) => {
                // Charger tous les paths restants
                return forkJoin(remainingPaths$).pipe(
                    map((partialConfigs: Partial<T>[]) => {
                        // Fusionner progressivement: path1, puis path2 override path1, puis path3 override (path1+path2), etc.
                        let merged = { ...baseConfig };
                        partialConfigs.forEach(partialConfig => {
                            merged = { ...merged, ...partialConfig };
                        });
                        return merged;
                    })
                );
            }),
            map((finalConfig: T) => {
                console.log('final config',finalConfig)
                this.config = finalConfig;
            })
        );
    }
    getConfig(): T|undefined {
        if (this.config) {
            return this.config;
        } else {
            return undefined;
        }
    }
}
