import { AbstractBaseCollectionData } from './base-data-models-class';
import { ICollectionData } from './linked-data-models';
import { ICollectionLink } from './linked-data-models';
import { SubBaseCirculaireModel } from './sub-base-data-models-class';
import { SubBaseSymbol } from './sub-base-data-models-class';
import { SubBaseSymbolAcessory } from './sub-base-data-models-class';
import { SubBaseSymbolSens } from './sub-base-data-models-class';
import { SubBaseFiliere } from './sub-base-data-models-class';
import { SubBasePosition } from './sub-base-data-models-class';
import { SubBasePlacement } from './sub-base-data-models-class';
import { SubBaseSignification } from './sub-base-data-models-class';

export class CollectionLinkModel implements ICollectionLink {
	signification?: SubBaseSignification; // link
	placement?: SubBasePlacement;
	position?: SubBasePosition;
	circulaire?: SubBaseCirculaireModel; // link
	filiere?: SubBaseFiliere; // link
	symbols?: SubBaseSymbol;
	symbolsens?: SubBaseSymbolSens;
	symboleAccessory?: SubBaseSymbolAcessory;
	note?: string;
	spe?: boolean;
	constructor(options?: ICollectionLink) {
		if (options) {
			if (options.signification) {
				this.signification = new SubBaseSignification(option.signification);
			}
			if (options.placement) {
				this.placement = new SubBasePlacement(options.placement);
			}
			if (options.position) {
				this.position = new SubBasePosition(options.position);
			}
			if (options.circulaire) {
				this.circulaire = new SubBaseCirculaireModel(option.circulaire);
			}
			if (options.filiere) {
				this.filiere = new SubBaseFiliere(options.filiere);
			}
			if (options.symbols) {
				this.symbols = new SubBaseSymbol(options.symbols);
			}
			if (options.symbolsens) {
				this.symbolsens = new SubBaseSymbolSens(options.symbolsens);
			}
			if (options.symboleAccessory) {
				this.symboleAccessory = new SubBaseSymbolAcessory(options.symboleAccessory);
			}
			this.note = options.note;
			this.spe = !!options.spe;
		}
	}

	getJson() {
		const obj = {};
		for (const key in this) {
			if (Object.prototype.hasOwnProperty.call(this, key)) {
				const value = this[key];
				if (typeof value !== 'function') {
					obj[key] = this.parseValue(value);
				}
			}
		}
	}

	clone() {
		if (this.classModel) {
			return new CollectionLinkModel(this.getJson());
		}
	}

	private parseValue() {
		if (value instanceof AbstractBaseCollectionData) {
			return value.getJson();
		} else if (Array.isArray(value)) {
			return this.parseValue.map((item) => this.parseValue(item));
		} else {
		}
	}
}

export abstract class AbstractCollectionData extends AbstractBaseCollectionData implements ICollectionData {
	links: ICollectionLink[];
	constructor(options?: ICollectionData, classModel?) {
		if (options) {
			super(options, classModel);
			if (options.links) {
				this.links = options.links.map((item) => new CollectionLinkModel(item));
			} else {
				this.links = [];
			}
		}
	}

	filterSpe() {
		const clone = this.clone();
		clone.links = clone.link.filter((link) => link.spe);
		return clone;
	}

	filterNoSpe() {
		const clone = this.clone();
		clone.links = clone.link.filter((link) => !link.spe);
		return clone;
	}
	filterNote() {
		const clone = this.clone();
		clone.links = clone.link.filter((link) => !!link.note);
		return clone;
	}

	filterNoNote() {
		const clone = this.clone();
		clone.links = clone.link.filter((link) => !link.note);
		return clone;
	}
}

export class CirculaireModel extends AbstractCollectionData implements ICirculaire {
	matiere: string;
	constructor(options?: ICirculaire, classModel = CirculaireModel) {
		super(options, classModel);
		if (options) {
			this.matiere = options.matiere;
		}
	}
}

export class FiliereModel extends AbstractCollectionData implements IFiliere {
	constructor(options?: IFiliere, classModel = FiliereModel) {
		super(options, classModel);
	}
}

export class SymbolModel extends AbstractCollectionData implements ISymbol {
	imgs?: {
		id: string;
		url: string;
	}[];
	constructor(options?: ISymbol, classModel = SymbolModel) {
		super(options, classModel);
		if (options) {
			if (options.imgs) {
				this.imgs = options.imgs;
			} else {
				this.imgs = [];
			}
		}
	}
}

export class PlacementModel extends AbstractCollectionData implements IPlacement {
	constructor(options: IPlacement, classModel = PlacementModel) {
		super(options, classModel);
	}
}

export class PositionModel extends AbstractCollectionData implements IPosition {
	constructor(options: IPosition, classModel = PositionModel) {
		super(options, classModel);
	}
}
