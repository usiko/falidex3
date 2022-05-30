export interface IBaseCollectionData {
	id: string;
	name?: string;
}

export interface IBaseCirculaire extends IBaseCollectionData {
	//data linked

	matiere: string;
}

export interface IBaseCirculaireColor extends IBaseCollectionData {
	//linked to color
	circulaireId: string;
	colorIds: string[];
}
export interface IBaseColor extends IBaseCollectionData {
	//linked to circulaire color
	colorData: string; //couleur hexa rgb ou autre
}

export interface IBaseFiliere extends IBaseCollectionData {
	//data linked
}

export interface IBaseSymbol extends IBaseCollectionData {
	//data linked

	imgs?: {
		id: string;
		url: string;
		modificationDate: Date;
	}[];
}
export interface IBaseSignification extends IBaseCollectionData {
	//data linked
	content: string;
}

export interface IBasePlacement extends IBaseCollectionData {
	//data linked
}
export interface IBasePosition extends IBaseCollectionData {
	//data linked
}
export interface IBaseSymbolSens extends IBaseCollectionData {
	//data linked
}
export interface IBaseSymbolAcessory extends IBaseCollectionData {
	//data linked
}

export interface IBaseCodeSpe extends IBaseCollectionData {
	text: string;
	article?: string;
	note?: string;
}
