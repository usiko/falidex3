export enum SortEnum {
    asc = 'ASC',
    desc = 'DESC',
}

export interface Sort {
    property: string,
    order: SortEnum
}