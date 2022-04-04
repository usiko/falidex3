export interface ICollectionFilter {
	property: string; // where to compare
	value: any; // value given (sarch text or anything else)
	operator: FilterOperatorEnum;
	propertyGetter?: () => any;
}

export class CollectionFilter implements ICollectionFilter {
	public operator: FilterOperatorEnum;
	public property: string;
	public value: any;
	public propertyGetter?: () => any;
	constructor(options?: Partial<ICollectionFilter>) {
		if (options) {
			if (options.value) {
				this.value = options.value;
			}
			if (options.operator) {
				this.operator = options.operator;
			}
			if (options.property) {
				this.property = options.property;
			}
			if (options.propertyGetter) {
				this.propertyGetter = options.propertyGetter;
			}
		}
	}
}

export class ContainCollectionFilter extends CollectionFilter implements ICollectionFilter {
	constructor(options?: Partial<ICollectionFilter>) {
		super();
		this.operator = FilterOperatorEnum.contain;
	}
}

export class EqualCollectionFilter extends CollectionFilter implements ICollectionFilter {
	constructor(options?: Partial<ICollectionFilter>) {
		super();
		this.operator = FilterOperatorEnum.equal;
	}
}
export class DifferentCollectionFilter extends CollectionFilter implements ICollectionFilter {
	constructor(options?: Partial<ICollectionFilter>) {
		super();
		this.operator = FilterOperatorEnum.different;
	}
}

export class ExludeCollectionFilter extends CollectionFilter implements ICollectionFilter {
	constructor(options?: Partial<ICollectionFilter>) {
		super();
		this.operator = FilterOperatorEnum.exclude;
	}
}

export enum FilterOperatorEnum {
	contain = 'Contain',
	equal = 'equal',
	different = 'different',
	exclude = 'exclude',
}

export class DisplayFilters implements IDisplayFilters {
	label: string;
	filters: IDisplayFilterItem[] = [];
	constructor(options?: Partial<IDisplayFilters>) {
		if (options) {
			if (options.label) {
				this.label = options.label;
			}
			if (options.filters) {
				this.filters = options.filters.map((item) => {
					switch (item.type) {
						case FilterDisplayTypeEnum.toggle:
							return new DisplayToggleFilter(item);
						default:
							return new DisplayFilterItem(item);
					}
				});
			}
		}
	}

	getCollectionFilters(): ICollectionFilter[] {
		return this.filters.map((item) => item.filter);
	}
}

export interface IDisplayFilters {
	label: string;
	filters: IDisplayFilterItem[];
	getCollectionFilters(): ICollectionFilter[];
}

export interface IDisplayFilterItem {
	label: string;
	filter: ICollectionFilter;
	type: FilterDisplayTypeEnum;
	enabled: boolean;
}

export enum FilterDisplayTypeEnum {
	toggle = 'toggle',
}

export class DisplayFilterItem {
	public type: FilterDisplayTypeEnum;
	public label: string;
	public filter: ICollectionFilter;
	public enabled: boolean;
	constructor(options: Partial<IDisplayFilterItem>) {
		if (options) {
			if (options.label) {
				this.label = options.label;
			}
			if (options.enabled) {
				this.enabled = options.enabled;
			}
			if (options.enabled) {
				this.enabled = options.enabled;
			}
			if (options.type) {
				this.type = options.type;
			}
		}
	}
}

/**
 * filters you can enable or disable
 */
export class DisplayToggleFilter extends DisplayFilterItem implements IDisplayFilterItem {
	constructor(options: Partial<IDisplayFilterItem>) {
		super(options);
		this.type = FilterDisplayTypeEnum.toggle;
	}
}
