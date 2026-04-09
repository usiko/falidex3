import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
    selector: 'app-home-about',
    templateUrl: 'home-about.component.html',
    styleUrls: ['home-about.component.scss'],
})
export class HomeAbout {
    constructor(private configService: ConfigService) {}
    public showDonate = false;
    ngOnInit(): void {
        const config = this.configService.getConfig();
        this.showDonate = config.donate;
    }
}
