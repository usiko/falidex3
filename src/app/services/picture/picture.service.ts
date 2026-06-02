import { Injectable } from '@angular/core';
import { AppConfigService } from '../config/app.config.service';

@Injectable({
    providedIn: 'root',
})
export class PictureService {
    constructor(private config:AppConfigService) {}


    getFullResourceUrl(src: string) {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }
        const config = this.config.getConfig();
        if (config) {
            const baseUrl = config.urls.dataServer;
            if (baseUrl && src) {
                return `${baseUrl}${src}`;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
}
