export interface IConfig {
    loadingSteps: ILoadingSteps[];
    loadingErrorMessage: string;
    urls: {
        dataServer: string;
        pictureServer: string;
    };
    paths: {
        circulaires: string;
        circualireColors: string;
        symbols: string;
        symbolSens: string;
        symbolAccessories: string;
        significations: string;
        filieres: string;
        placements: string;
        positions: string;
        colors: string;
        dataLink: string;
    };
    update: {
        frequency: 'auto' | 'everytimes';
        clearCacheOnUpdate: boolean;
    };
    pictureServerSalt: string;
    donate: boolean;
    storeEnabled: boolean;
    //[key: string]: any;
}

export interface ILoadingSteps {
    message: string;
}

export class GlobalConfig {
    loadingSteps: ILoadingSteps[];
    loadingErrorMessage: string;
    urls: {
        dataServer: string;
        pictureServer: string;
    };
    paths: {
        circulaires: string;
        circualireColors: string;
        symbols: string;
        symbolSens: string;
        symbolAccessories: string;
        significations: string;
        filieres: string;
        placements: string;
        positions: string;
        colors: string;
        dataLink: string;
    };
    update: {
        frequency: 'auto' | 'everytimes';
        clearCacheOnUpdate: boolean;
    };
    pictureServerSalt: string;
    //[key: string]: any;
    donate: boolean;
    storeEnabled: boolean;
    constructor(options?: IConfig) {
        if (options) {
            this.loadingSteps = options?.loadingSteps ? options.loadingSteps : [];
            this.urls = options?.urls;
            this.loadingErrorMessage = options?.loadingErrorMessage;
            this.paths = options?.paths;
            this.update = options?.update;
            this.pictureServerSalt = options?.pictureServerSalt;
            this.donate = options?.donate;
            this.storeEnabled = options?.donate;
        }
    }
}
