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
        token:string;
	};
	update: {
		frequency: 'auto' | 'everytimes';
		clearCacheOnUpdate: boolean;
	};
	pictureServerSalt: string;
	donate: boolean;
	storeEnabled: boolean;
    tokenHeader:string;
    tokenKey:string;
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
        token:string;
	};
	update: {
		frequency: 'auto' | 'everytimes';
		clearCacheOnUpdate: boolean;
	};
	pictureServerSalt: string;
	//[key: string]: any;
	donate: boolean;
	storeEnabled: boolean;
    tokenHeader:string;
    tokenKey:string;
	constructor(options: IConfig) {
		
			this.loadingSteps = options?.loadingSteps ? options.loadingSteps : [];
			this.urls = options?.urls;
			this.loadingErrorMessage = options?.loadingErrorMessage;
			this.paths = options?.paths;
			this.update = options?.update;
			this.pictureServerSalt = options?.pictureServerSalt;
			this.donate = options?.donate;
			this.storeEnabled = options?.storeEnabled;
			this.tokenHeader = options?.tokenHeader;
			this.tokenKey = options?.tokenKey;
		
	}
}
