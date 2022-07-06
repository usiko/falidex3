import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class PictureService {
    constructor(private config: ConfigService) {}
    getFullResourceUrl(src: string) {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }
        const config = this.config.getConfig();
        if (config) {
            const baseUrl = config.urls.pictureServer;
            const salt = config.pictureServerSalt;
            if (baseUrl && src) {
                if (salt) {
                    return `${baseUrl}?getPicture=${src}&littleSalty=${salt}`;
                } else {
                    return `${baseUrl}?getPicture?=${src}`;
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
}
