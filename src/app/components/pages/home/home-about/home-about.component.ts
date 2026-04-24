import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonCard, IonCardContent, IonText } from "@ionic/angular/standalone";
import { AppConfigService } from 'src/app/services/config/app.config.service';
import { PaypalDonateComponent } from "./paypal-donate/paypal-donate.component";

@Component({
    selector: 'app-home-about',
    templateUrl: 'home-about.component.html',
    styleUrls: ['home-about.component.scss'],
    imports: [IonCard, IonCardContent, IonText, PaypalDonateComponent,CommonModule],
})
export class HomeAbout {
    private configService = inject(AppConfigService);
    public showDonate = false;
    ngOnInit(): void {
        const config = this.configService.getConfig();
        this.showDonate = !!config?.donate;
    }
}
