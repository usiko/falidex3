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
		token: string;
	};
	update: {
		frequency: 'auto' | 'everytimes';
		clearCacheOnUpdate: boolean;
	};
	pictureServerSalt: string;
	storeEnabled: boolean;
	//[key: string]: any;
}

export interface ILoadingSteps {
	message: string;
}

