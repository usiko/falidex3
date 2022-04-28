import { BaseFiliereModel } from './base-data-models-class';
import { BaseSymbolModel } from './base-data-models-class';
import { BaseSignificationModel } from './base-data-models-class';
import { BaseSymbolAcessoryModel } from './base-data-models-class';
import { BasePlacementModel } from './base-data-models-class';
import { BasePositionModel } from './base-data-models-class';
import { BaseSymbolSensModel } from './base-data-models-class';
import { BaseColorModel } from './base-data-models-class';
import { BaseCirculaireModel } from './base-data-models-class';
import { ISubBaseSymbol } from './sub-base-data-models';
import { ISubBasePlacement } from './sub-base-data-models';
import { ISubSymbolSens } from './sub-base-data-models';
import { ISubBaseSymbolAcessory } from './sub-base-data-models';
import { ISubBasePosition } from './sub-base-data-models';
import { ISubBaseSignification } from './sub-base-data-models';
import { ISubBaseFiliere } from './sub-base-data-models';
import { ISubBaseCirculaire } from './sub-base-data-models';

export class SubBaseCirculaireModel extends BaseCirculaireModel implements ISubBaseCirculaire {
	colors: IBaseColor[] = [];
	constructor(options: ISubBaseCirculaire, classModel = SubBaseCirculaireModel) {
		super(options, classModel);
		if (colors) {
			if (options.colors) {
				this.colors = options.colors.map((item) => new BaseColorModel(item));
			} else {
				this.colors = [];
			}
		}
	}
}

export class SubBaseFiliere extends BaseFiliereModel implements ISubBaseFiliere {
	constructor(options?: ISubBaseFiliere, classModel = SubBaseFiliere) {
		super(options, classModel);
	}
}

export class SubBaseSymbol extends BaseSymbolModel implements ISubBaseSymbol {
	constructor(options, classModel = SubBaseSymbol) {
		super(options, classModel);
	}
}

export class SubBaseSignification extends BaseSignificationModel implements ISubBaseSignification {
	constructor(options, classModel = SubBaseSignification) {
		super(options, classModel);
	}
}

export class SubBasePlacement extends BasePlacementModel implements ISubBasePlacement {
	constructor(options, classModel = SubBasePlacement) {
		super(options, classModel);
	}
}

export class SubBasePosition extends BasePositionModel implements ISubBasePosition {
	constructor(options, classModel = SubBasePosition) {
		super(options, classModel);
	}
}

export class SubBaseSymbolSens extends BaseSymbolSensModel implements ISubSymbolSens {
	constructor(options, classModel = SubBaseSymbolSens) {
		super(options, classModel);
	}
}

export class SubBaseSymbolAcessory extends BaseSymbolAcessoryModel implements ISubBaseSymbolAcessory {
	constructor(options, classModel = SubBaseSymbolSens) {
		super(options, classModel);
	}
}
