import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    @Input() pages: { title: string, url: string, icon?: string, src?: string, disabled?: boolean }[] = [];
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
