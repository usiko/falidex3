import { Component, OnInit } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-paypal-donate',
    templateUrl: './paypal-donate.component.html',
    styleUrls: ['./paypal-donate.component.scss'],
    imports: [IonButton, FaIconComponent, IonCard, IonCardContent, IonText],
})
export class PaypalDonateComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    openPaypal() {
        window.open('https://bit.ly/3Pby21n', '_blank');
    }
}
