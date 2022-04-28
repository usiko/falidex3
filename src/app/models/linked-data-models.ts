import { IBaseCirculaire, IBaseCollectionData, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol } from './base-data-models';
import { ISubBaseCollectionData } from './sub-base-data-models';
import {
	ISubBaseSignification,
	ISubBasePlacement,
	ISubBasePosition,
	ISubBaseCirculaire,
	ISubBaseFiliere,
	ISubBaseSymbol,
	ISubSymbolSens,
	ISubBaseSymbolAcessory,
} from './sub-base-data-models';
import { SubBasePlacement } from './sub-base-data-models-class';
import { SubBasePosition } from './sub-base-data-models-class';
import { SubBaseSignification } from './sub-base-data-models-class';
import { SubBaseSymbol } from './sub-base-data-models-class';
import { SubBaseFiliere } from './sub-base-data-models-class';
import { SubBaseCirculaireModel } from './sub-base-data-models-class';

export interface ICollectionData extends ISubBaseCollectionData {
	links: ICollectionLink[];
}

export interface ICollectionLink {
	signification?: ISubBaseSignification; // link
	placement?: ISubBasePlacement;
	position?: ISubBasePosition;
	circulaire?: ISubBaseCirculaire; // link
	filiere?: ISubBaseFiliere; // link
	symbols?: ISubBaseSymbol;
	symbolsens?: ISubSymbolSens;
	symboleAccessory?: ISubBaseSymbolAcessory;
	note?: string;
	spe?: boolean;
}

export interface ICirculaire extends ICollectionData {
	//data linked
	matiere: string;
}

export interface IFiliere extends ICollectionData {
	//data linked
}

export interface ISymbol extends ICollectionData {
	//data linked

	imgs?: {
		id: string;
		url: string;
	}[];
}

export interface ISignification extends ICollectionData {
	//data linked
	content: string;
}

export class SignificationModel extends AbstractCollectionData implements ISignification {
	content: string;
	constructor(options?: ISignification) {
		super(options);
		if (options) {
			this.content = options.content;
		}
	}
}

export interface IPlacement extends ICollectionData {
	//data linked
}

export interface IPosition extends ICollectionData {
	//data linked
}
