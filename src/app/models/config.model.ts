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
    updateApp: 'auto' | 'everytimes';
    pictureServerSalt: string;
    [key: string]: any;
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
    updateApp: 'auto' | 'everytimes';
    pictureServerSalt: string;
    [key: string]: any;
    constructor(options?: IConfig) {
        if (options) {
            this.loadingSteps = options.loadingSteps ? options.loadingSteps : [];
            this.urls = options.urls;
            this.loadingErrorMessage = options.loadingErrorMessage;
            this.paths = options.paths;
            this.updateApp = options.updateApp;
            this.pictureServerSalt = options.pictureServerSalt;
        }
    }

    get(key: string) {
        if (this.key) {
            return this.key;
        } else {
            return null;
        }
    }
}
