import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-paypal-donate',
    templateUrl: './paypal-donate.component.html',
    styleUrls: ['./paypal-donate.component.scss'],
})
export class PaypalDonateComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    openPaypal() {
        window.open('https://bit.ly/3Pby21n', '_blank');
    }
}
