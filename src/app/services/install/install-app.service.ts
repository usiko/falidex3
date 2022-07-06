import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InstallAppService {
    constructor() {}

    public installable$ = new BehaviorSubject(false);
    private installEvent;

    init(eventName: string): Observable<void> {
        window.addEventListener(eventName, (e) => {
            e.preventDefault();
            this.setEvent(e);
        });
        return of(null);
    }

    promptInstall() {
        if (this.installEvent) {
            this.installEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the prompt');
                    this.installable$.next(false);
                    this.setEvent(undefined);
                } else {
                    console.log('User dismissed the prompt');
                }
            });
            this.installEvent.prompt();
        } else {
            this.installable$.next(false);
        }
    }

    private setEvent(event) {
        this.installEvent = event;
        console.log('setEvent', event);
        console.log('setEvent', this.installEvent !== null && this.installEvent !== undefined);
        if (this.installEvent !== null && this.installEvent !== undefined) {
            this.installable$.next(true);
        } else {
            this.installable$.next(false);
        }
    }
}
