import { ICollectionData, ICollectionLink } from '../linked-data-models';

export class DataFilter<Item> implements IDataFilters<Item> {
    operator: FilterOperatorEnum;
    propertyGetter?: (item: Item) => any;
    values: any[]; // value given (sarch text or anything else)
    type?: 'link' | 'collection';
    constructor(options?: Partial<IDataFilters<Item>>) {
        if (options) {
            if (options.values) {
                this.values = options.values;
            }
            if (options.operator) {
                this.operator = options.operator;
            }
            if (options.propertyGetter) {
                this.propertyGetter = options.propertyGetter;
            }
        }
    }
}
export interface IDataFilters<Item> {
    operator: FilterOperatorEnum;
    propertyGetter?: (item: Item) => any;
    values: any[]; // value given (sarch text or anything else)
    type?: 'link' | 'collection';
}
export class LinkFilters extends DataFilter<ICollectionLink> {
    constructor(options?: Partial<IDataFilters<ICollectionLink>>) {
        super(options);
        this.type = 'link';
    }
}

export interface ICollectionFilter<Item extends ICollectionData> extends IDataFilters<Item> {
    propertyToFilter: string; // where to compare
    linkToFilter?: (links: ICollectionLink[]) => ICollectionLink[];
}

export class CollectionFilter<Item extends ICollectionData> extends DataFilter<Item> implements ICollectionFilter<Item> {
    public propertyToFilter: string;

    public linkToFilter?: (links: ICollectionLink[]) => ICollectionLink[];

    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options);
        if (options) {
            if (options.propertyToFilter) {
                this.propertyToFilter = options.propertyToFilter;
            }
            if (options.linkToFilter) {
                this.linkToFilter = options.linkToFilter;
            }
        }
        this.type = 'collection';
    }
}

export class ContainCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options);
        this.operator = FilterOperatorEnum.contain;
    }
}

export class EqualCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options);
        this.operator = FilterOperatorEnum.equal;
    }
}
export class DifferentCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options);
        this.operator = FilterOperatorEnum.different;
    }
}

export class ExludeCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options);
        this.operator = FilterOperatorEnum.exclude;
    }
}

export enum FilterOperatorEnum {
    contain = 'Contain',
    equal = 'equal',
    different = 'different',
    exclude = 'exclude',
}

export class DisplayFilters<Item extends ICollectionData> implements IDisplayFilters<Item> {
    label: string;
    filters: IDisplayFilterItem<Item>[] = [];
    constructor(options?: Partial<IDisplayFilters<Item>>) {
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

    getCollectionFilters(): ICollectionFilter<Item>[] {
        return this.filters.map((item) => item.filter);
    }
}

export interface IDisplayFilters<Item extends ICollectionData> {
    label: string;
    filters: IDisplayFilterItem<Item>[];
    getCollectionFilters(): ICollectionFilter<Item>[];
}

export interface IDisplayFilterItem<Item extends ICollectionData> {
    label: string;
    filter: ICollectionFilter<Item>;
    type: FilterDisplayTypeEnum;
    enabled: boolean;
}

export enum FilterDisplayTypeEnum {
    toggle = 'toggle',
}

export class DisplayFilterItem<Item extends ICollectionData> {
    public type: FilterDisplayTypeEnum;
    public label: string;
    public filter: ICollectionFilter<Item>;
    public enabled: boolean;
    constructor(options: Partial<IDisplayFilterItem<Item>>) {
        if (options) {
            if (options.label) {
                this.label = options.label;
            }
            if (options.filter) {
                this.filter = new CollectionFilter<Item>(options.filter);
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
export class DisplayToggleFilter<Item extends ICollectionData> extends DisplayFilterItem<Item> implements IDisplayFilterItem<Item> {
    constructor(options: Partial<IDisplayFilterItem<Item>>) {
        super(options);
        this.type = FilterDisplayTypeEnum.toggle;
    }
}
