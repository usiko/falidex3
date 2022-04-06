import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InstallAppService {

    constructor() { }

    private installable$ = new BehaviorSubject(undefined);
    private installEvent;
    private installed = false;
    setEvent(event) {
        this.installEvent = event;
        console.log('setEvent', event);
        console.log('setEvent', (this.installEvent !== null && this.installEvent !== undefined))
        if (this.installEvent !== null && this.installEvent !== undefined && !this.installed) {
            this.installable$.next(true);
        }
        else {
            this.installable$.next(false);
        }

    }

    isInstallable(): BehaviorSubject<any> {
        return this.installable$;
    }

    promptInstall() {
        if (this.installEvent) {

            this.installEvent.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the prompt');
                        this.installed = true;
                        this.setEvent(null);
                    } else {
                        console.log('User dismissed the prompt');
                    }
                });
            this.installEvent.prompt();
        }
    }
}
