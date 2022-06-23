import { Injectable } from '@angular/core';
import { ConfigService } from './services/config/config.service';

export const initializeConfig = (configService: ConfigService) => {
    return (): Promise<any> => {
        return configService.loadConfig().toPromise();
    };
};
