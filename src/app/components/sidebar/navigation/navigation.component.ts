import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject } from 'rxjs';
import { InstallAppService } from 'src/app/services/install/install-app.service';
import { IonList, IonItem, IonItemDivider, IonMenuToggle, IonLabel } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * navigation menu
 */
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    imports: [IonList, IonItem, FaIconComponent, IonItemDivider, IonMenuToggle, IonLabel, RouterModule,CommonModule],
})
export class NavigationComponent implements OnInit {
    /**
     * list of page to navigate
     */
    @Input() pages: {
        title: string;
        url: string;
        icon?: string;
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
}
