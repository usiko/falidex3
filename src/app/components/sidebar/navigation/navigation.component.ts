import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject } from 'rxjs';
import { InstallAppService } from 'src/app/services/install/install-app.service';

/**
 * navigation menu
 */
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    /**
     * list of page to navigate
     */
    @Input() pages: {
        title: string;
        url: string;
        icon?: IconName;
        src?: string;
        disabled?: boolean;
    }[] = [];

    /**
     * show pwa install button
     */
    public installable$ = new BehaviorSubject(false);

    constructor(private install: InstallAppService) {}

    ngOnInit() {
        this.installable$ = this.install.installable$;
    }

    installApp() {
        this.install.promptInstall();
    }

    /**
     * track by forngfor list
     * @param index number, index in list
     * @param item Item current item iterrated
     *
     */
    public trackByFnMenu(index: Number, item: any) {
        return index;
    }
}
