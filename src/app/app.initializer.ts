import { Injectable } from '@angular/core';
import { ConfigService } from './services/config/config.service';
import { StorageService } from './services/storage/storage.service';

export const initializeConfig = (configService: ConfigService, storageService: StorageService) => {
    return (): Promise<any> => {
        return Promise.all([configService.loadConfig().toPromise(), storageService.init().toPromise()]);
    };
};
