export interface ICollectionFilter {
	property: string; // where to compare
	value: any; // value given (sarch text or anything else)
	operator: FilterOperatorEnum;
	propertyGetter?: () => any;
}

export class ContainCollectionFilter implements ICollectionFilter {
	public operator = FilterOperatorEnum.contain;
	public property: string;
	public value: any;
	public propertyGetter?: () => any;
	constructor(options?: {
		propertyGetter?: () => any;
		property?: string; // where to compare
		value?: any;
	}) {
		if (options) {
			if (options.value) {
				this.value = options.value;
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

export class EqualCollectionFilter implements ICollectionFilter {
	public operator = FilterOperatorEnum.equal;
	public property: string;
	public value: any;
	public propertyGetter?: () => any;
	constructor(options?: {
		propertyGetter?: () => any;
		property?: string; // where to compare
		value?: any;
	}) {
		if (options) {
			if (options.value) {
				this.value = options.value;
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
export class DifferentCollectionFilter implements ICollectionFilter {
	public operator = FilterOperatorEnum.different;
	public property: string;
	public value: any;
	public propertyGetter?: () => any;
	constructor(options?: {
		propertyGetter?: () => any;
		property?: string; // where to compare
		value?: any;
	}) {
		if (options) {
			if (options.value) {
				this.value = options.value;
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

export class ExludeCollectionFilter implements ICollectionFilter {
	public operator = FilterOperatorEnum.exclude;
	public property: string;
	public value: any;
	public propertyGetter?: () => any;
	constructor(options?: {
		propertyGetter?: () => any;
		property?: string; // where to compare
		value?: any;
	}) {
		if (options) {
			if (options.value) {
				this.value = options.value;
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

export enum FilterOperatorEnum {
	contain = 'Contain',
	equal = 'equal',
	different = 'different',
	exclude = 'exclude',
}

export class DisplayFilters implements IDisplayFilters {
	label: string;
	filters: IDisplayFilterItem[] = [];
	constructor(options?: { label?: string; filters?: IDisplayFilterItem[] }) {
		if (options) {
			if (options.label) {
				this.label = options.label;
			}
			if (options.filters) {
				this.filters = options.filters;
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
}

export enum FilterDisplayTypeEnum {
	toggle = 'toggle',
}

/**
 * filters you can enable or disable
 */
export class IDisplayToggleFilter implements IDisplayFilterItem {
	public type = FilterDisplayTypeEnum.toggle;
	public label: string;
	public filter: ICollectionFilter;
	constructor(options: { label: string; filter: ICollectionFilter }) {
		if (options) {
			if (options.label) {
				this.label = options.label;
				this.filter = options.filter;
			}
		}
	}
}
