import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { IonCard, IonCardContent, IonText } from "@ionic/angular/standalone";
import { PaypalDonateComponent } from "./paypal-donate/paypal-donate.component";

@Component({
    selector: 'app-home-about',
    templateUrl: 'home-about.component.html',
    styleUrls: ['home-about.component.scss'],
    imports: [IonCard, IonCardContent, IonText, PaypalDonateComponent],
})
export class HomeAbout {
    constructor(private configService: ConfigService) {}
    public showDonate = false;
    ngOnInit(): void {
        const config = this.configService.getConfig();
        this.showDonate = !!config?.donate;
    }
}
