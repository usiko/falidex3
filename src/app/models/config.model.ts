export interface IConfig {
	loadingSteps: LoadingSteps[];
	[key: string]: any;
}

export interface ILoadingSteps {
	message: string;
}

export class GlobalConfig {
	loadingSteps: LoadingSteps[];
	[key: string]: any;
	constructor(options?: IConfig) {
		if (oprions) {
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
