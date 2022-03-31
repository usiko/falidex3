import { Component, Input, OnInit } from '@angular/core';

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
    @Input() pages: { title: string, url: string, icon?: string, src?: string, disabled?: boolean }[] = [];

    /**
     * show pwa install button
     */
    public installable: boolean = true;
    
    constructor() { }

    ngOnInit() {
        /*this.install.isInstallable().subscribe((data: boolean) => {
            console.log("isInstallable", data)
            this.installable = data;
        })*/

    }

    installApp() {
        //this.install.promptInstall();
    }

}
