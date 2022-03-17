import { IBaseCirculaire, IBaseCollectionData, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol } from "./base-data-models";
import { ISubBaseSignification, ISubBasePlacement, ISubBasePosition, ISubBaseCirculaire, ISubBaseFiliere, ISubBaseSymbol, ISubSymbolSens, ISubBaseSymbolAcessory } from "./sub-base-data-models";

export interface ICollectionData {
    id: string;
    name?: string;
    links: ICollectionLink[];
}

export interface ICollectionLink {
    signification?: ISubBaseSignification;// link
    placement?: ISubBasePlacement;
    position?: ISubBasePosition;
    circulaire?: ISubBaseCirculaire; // link
    filiere?: ISubBaseFiliere; // link
    symbols?: ISubBaseSymbol;
    symbolsens?: ISubSymbolSens;
    symboleAccessory?: ISubBaseSymbolAcessory;
    note?: string;
    spe?: boolean;
}

export interface ICirculaire extends ICollectionData { //data linked
    matiere: string;
}




export interface IFiliere extends ICollectionData { //data linked


}

export interface ISymbol extends ICollectionData { //data linked

    imgs?: {
        id: string,
        url: string;
    }[];

}
export interface ISignification extends ICollectionData {  //data linked
    content: string;
    links: {
        placement: IBasePlacement;
        position: IBasePosition;
        symbole: IBaseCirculaire; // link
        note?: string;
        spe?: boolean;
    }[];

}

export interface IPlacement extends ICollectionData { //data linked


}
export interface IPosition extends ICollectionData { //data linked

}

