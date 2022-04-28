import { IBaseCirculaireColor } from './base-data-models';
import { IBaseFiliere } from './base-data-models';
import { IBaseSignification } from './base-data-models';
import { IBasePosition } from './base-data-models';
import { IBaseSymbolAcessory } from './base-data-models';
import { IBaseSymbolSens } from './base-data-models';
import { IBasePlacement } from './base-data-models';
import { IBaseSymbol } from './base-data-models';
import { IBaseColor } from './base-data-models';
import { IBaseCollectionData } from './base-data-models';
import { IBaseCirculaire } from './base-data-models';

export class AbstractBaseCollectionData implements IBaseCollectionData {
	id: string;
	name?: string;
	protected classModel: any;
	constructor(options?: IBaseCollectionData, classModel?: any) {
		if (options) {
			this.id = options.id;
			if (options.name) {
				this.name = options.name;
			}
			if (classModel) {
				this.classModel = classModel;
			}
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
			return new this.classModel(this.getJson());
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

export class BaseCirculaireModel extends AbstractBaseCollectionData implements IBaseCirculaire {
	matiere: string;
	constructor(options: IBaseCirculaire, classModel = BaseCirculaireModel) {
		super(options, classModel);
		if (options) {
			this.matiere = options.matiere;
		}
	}
}

export class BaseCirculaireColorModel extends AbstractBaseCollectionData implements IBaseCirculaireColor {
	circulaireId: string;
	colorIds: string[];
	constructor(options: IBaseCirculaireColor, classModel = BaseCirculaireColorModel) {
		super(options, classModel);
		if (options) {
			this.circulaireId = options.circulaireId;
			if (options.colorIds) {
				this.colorIds = options.colorIds;
			} else {
				this.colorIds = [];
			}
		}
	}
}

export class BaseColorModel extends AbstractBaseCollectionData implements IBaseColor {
	colorData: string; //couleur hexa rgb ou autre
	constructor(options: IBaseColor, classModel = BaseColorModel) {
		super(options, classModel);
		if (options) {
			this.colorData = options.colorData;
		}
	}
}

export class BaseFiliereModel extends AbstractBaseCollectionData implements IBaseFiliere {
	constructor(options: IBaseFiliere, classModel = BaseFiliereModel) {
		super(options, classModel);
	}
}

export class BaseSymbolModel extends AbstractBaseCollectionData implements IBaseSymbol {
	imgs?: {
		id: string;
		url: string;
	}[];
	constructor(options: IBaseSymbol) {
		super(options, classModel, (classModel = BaseSymbolModel));
		if (options) {
			if (options.imgs) {
				this.imgs = options.imgs;
			} else {
				this.imgs = [];
			}
		}
	}
}

export class BaseSignificationModel extends AbstractBaseCollectionData implements IBaseSignification {
	content: string;
	constructor(options: IBaseSignification, classModel = BaseSignificationModel) {
		super(options, classModel);
		if (options) {
			this.content = options.content;
		}
	}
}

export class BasePlacementModel extends AbstractBaseCollectionData implements IBasePlacement {
	constructor(options: IBasePlacement, classModel = BasePlacementModel) {
		super(options, classModel);
	}
}

export class BasePositionModel extends AbstractBaseCollectionData implements IBasePosition {
	constructor(options: IBasePosition, classModel = BasePositionModel) {
		super(options, classModel);
	}
}
export class BaseSymbolSensModel extends AbstractBaseCollectionData implements IBaseSymbolSens {
	constructor(options: IBaseSymbolSens, classModel = BaseSymbolSensModel) {
		super(options, classModel);
	}
}

export class BaseSymbolAcessoryModel extends AbstractBaseCollectionData implements IBaseSymbolAcessory {
	constructor(options: IBaseSymbolAcessory, classModel = BaseSymbolAcessoryModel) {
		super(options, classModel);
	}
}
