import { IBaseCodeSpe } from './base-data-models';
import { ICodeSpe } from './linked-data-models';

export interface IRelationItem {
    id:string;
    placementId?: string;
    positionId?: string;
    filiereId?: string;
    symboleId?: string;
    symboleSensId?: string;
    symboleAccessoryId?: string;
    circulaireId?: string;
    significationId?: string;
    spe?: boolean;
    absent?: boolean;
    blame?: boolean;
    note?: string;
    created_at?:Date;
    updated_at?:Date;
}

/*export interface IRelationContentSpe {
    id: string;
    name: string;
    text?: string;
    article?: string;
    note?: string;
}*/

export interface IRelationData {
    name: string;
    id: string;
    annee: number;
    default?: boolean;
    relations: IRelationItem[];
    specificites?: IBaseCodeSpe[];
    ville?:string;
    visible?:boolean;
    national:boolean;
    last_update?:Date;
    created_at?:Date;

}
