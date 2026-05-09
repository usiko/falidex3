import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonCard, IonCardContent, IonText, ModalController } from "@ionic/angular/standalone";
import { AppConfigService } from 'src/app/services/config/app.config.service';
import { PaypalDonateComponent } from "./paypal-donate/paypal-donate.component";
import { environment } from 'src/environments/environment';
import { SecretLoginComponent } from '../../../secret-login/secret-login.component';

@Component({
    selector: 'app-home-about',
    templateUrl: 'home-about.component.html',
    styleUrls: ['home-about.component.scss'],
    imports: [IonCard, IonCardContent, IonText, PaypalDonateComponent, CommonModule],
})
export class HomeAbout {
    private configService = inject(AppConfigService);
    private modalCtrl = inject(ModalController);
    public showDonate = false;
    private clickTimestamps: number[] = [];
    
    ngOnInit(): void {
        this.showDonate = !!environment.donate;
    }

    onCardClick() {
        const now = Date.now();
        this.clickTimestamps.push(now);
        
        // Garder seulement les clics des 10 dernières secondes
        this.clickTimestamps = this.clickTimestamps.filter(
            timestamp => now - timestamp <= 10000
        );
        
        // Si 10 clics ou plus en moins de 10 secondes
        if (this.clickTimestamps.length >= 20) {
            this.openSecretLogin();
            // Réinitialiser le compteur
            this.clickTimestamps = [];
        }
    }

    async openSecretLogin() {
        const modal = await this.modalCtrl.create({
            component: SecretLoginComponent
        });
        
        await modal.present();
    }
}
