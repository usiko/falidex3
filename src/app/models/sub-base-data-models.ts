import { IBaseCirculaire, IBaseCollectionData, IBaseColor, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol, IBaseSymbolAcessory, IBaseSymbolSens } from "./base-data-models";

export interface ISubBaseCollectionData extends IBaseCollectionData { //data linked
}

export interface ISubBaseCirculaire extends IBaseCirculaire { //data linked
    colors: IBaseColor[];
}

export interface ISubBaseFiliere extends IBaseFiliere { //data linked
}

export interface ISubBaseSymbol extends IBaseSymbol { //data linked
}

export interface ISubBaseSignification extends IBaseSignification {  //data linked
}

export interface ISubBasePlacement extends IBasePlacement { //data linked
}

export interface ISubBasePosition extends IBasePosition { //data linked
}

export interface ISubSymbolSens extends IBaseSymbolSens { //data linked
}
export interface ISubBaseSymbolAcessory extends IBaseSymbolAcessory { //data linked
}
