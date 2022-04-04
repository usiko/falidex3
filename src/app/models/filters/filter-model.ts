import { ICollectionData, ICollectionLink } from '../linked-data-models'

export interface ICollectionFilter<Item extends ICollectionData> {
    propertyToFilter: string // where to compare
    value: any // value given (sarch text or anything else)
    operator: FilterOperatorEnum
    linkToFilter?: (links: ICollectionLink[]) => ICollectionLink[]
    propertyGetter?: (item: Item) => any
}

export class CollectionFilter<Item extends ICollectionData> implements ICollectionFilter<Item> {
    public operator: FilterOperatorEnum
    public propertyToFilter: string
    public value: any
    public linkToFilter?: (links: ICollectionLink[]) => ICollectionLink[]
    public propertyGetter?: (item: Item) => any
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        if (options) {
            if (options.value) {
                this.value = options.value
            }
            if (options.operator) {
                this.operator = options.operator
            }
            if (options.propertyToFilter) {
                this.propertyToFilter = options.propertyToFilter
            }
            if (options.linkToFilter) {
                this.linkToFilter = options.linkToFilter
            }
            if (options.propertyGetter) {
                this.propertyGetter = options.propertyGetter
            }
        }
    }
}

export class ContainCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options)
        this.operator = FilterOperatorEnum.contain
    }
}

export class EqualCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options)
        this.operator = FilterOperatorEnum.equal
    }
}
export class DifferentCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options)
        this.operator = FilterOperatorEnum.different
    }
}

export class ExludeCollectionFilter<Item extends ICollectionData> extends CollectionFilter<Item> implements ICollectionFilter<Item> {
    constructor(options?: Partial<ICollectionFilter<Item>>) {
        super(options)
        this.operator = FilterOperatorEnum.exclude
    }
}

export enum FilterOperatorEnum {
    contain = 'Contain',
    equal = 'equal',
    different = 'different',
    exclude = 'exclude',
}

export class DisplayFilters<Item extends ICollectionData> implements IDisplayFilters<Item> {
    label: string
    filters: IDisplayFilterItem<Item>[] = []
    constructor(options?: Partial<IDisplayFilters<Item>>) {
        if (options) {
            if (options.label) {
                this.label = options.label
            }
            if (options.filters) {
                this.filters = options.filters.map((item) => {
                    switch (item.type) {
                        case FilterDisplayTypeEnum.toggle:
                            return new DisplayToggleFilter(item)
                        default:
                            return new DisplayFilterItem(item)
                    }
                })
            }
        }
    }

    getCollectionFilters(): ICollectionFilter<Item>[] {
        return this.filters.map((item) => item.filter)
    }
}

export interface IDisplayFilters<Item extends ICollectionData> {
    label: string
    filters: IDisplayFilterItem<Item>[]
    getCollectionFilters(): ICollectionFilter<Item>[]
}

export interface IDisplayFilterItem<Item extends ICollectionData> {
    label: string
    filter: ICollectionFilter<Item>
    type: FilterDisplayTypeEnum
    enabled: boolean
}

export enum FilterDisplayTypeEnum {
    toggle = 'toggle',
}

export class DisplayFilterItem<Item extends ICollectionData> {
    public type: FilterDisplayTypeEnum
    public label: string
    public filter: ICollectionFilter<Item>
    public enabled: boolean
    constructor(options: Partial<IDisplayFilterItem<Item>>) {
        if (options) {
            if (options.label) {
                this.label = options.label
            }
            if (options.enabled) {
                this.enabled = options.enabled
            }
            if (options.enabled) {
                this.enabled = options.enabled
            }
            if (options.type) {
                this.type = options.type
            }
        }
    }
}

/**
 * filters you can enable or disable
 */
export class DisplayToggleFilter<Item extends ICollectionData> extends DisplayFilterItem<Item> implements IDisplayFilterItem<Item> {
    constructor(options: Partial<IDisplayFilterItem<Item>>) {
        super(options)
        this.type = FilterDisplayTypeEnum.toggle
    }
}
