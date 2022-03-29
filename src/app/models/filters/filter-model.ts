export interface ICollectionFilter {
    property: string,
    value: any,
    operator: FilterOperatorEnum
    valueGetter?: () => any
}

export enum FilterOperatorEnum {
    contain = 'Contain',
    equal = 'equal',
    different = 'different',
    exclude = 'exclude'

}
