export interface IConfig {
    loadingSteps: ILoadingSteps[];
    [key: string]: any;
}

export interface ILoadingSteps {
    message: string;
}

export class GlobalConfig {
    loadingSteps: ILoadingSteps[];
    [key: string]: any;
    constructor(options?: IConfig) {
        if (options) {
            this.loadingSteps = options.loadingSteps ? options.loadingSteps : [];
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
