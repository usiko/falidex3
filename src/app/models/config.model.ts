export interface IConfig {
    loadingSteps: ILoadingSteps[];
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
    [key: string]: any;
}

export interface ILoadingSteps {
    message: string;
}

export class GlobalConfig {
    loadingSteps: ILoadingSteps[];
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
    [key: string]: any;
    constructor(options?: IConfig) {
        if (options) {
            this.loadingSteps = options.loadingSteps ? options.loadingSteps : [];
            this.urls = options.urls;
            this.paths = options.paths;
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
