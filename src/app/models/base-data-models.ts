export interface IBaseCollectionData {
    id: string;
}

export interface IBaseCirculaire extends IBaseCollectionData { //data linked
    name: string;
    matiere: string;
}

export interface IBaseCirculaireColor extends IBaseCollectionData { //linked to color
    circulaireId: string;
    colorIds: string[]
}
export interface IBaseColor extends IBaseCollectionData {  //linked to circulaire color
    name: string;
    colorData: string //couleur hexa rgb ou autre
}

export interface IBaseFiliere extends IBaseCollectionData { //data linked

    name: string
}

export interface IBaseSymbol extends IBaseCollectionData { //data linked
    name: string;
    imgs?: {
        id: string,
        url: string
    }[]

}
export interface IBaseSignification extends IBaseCollectionData {  //data linked
    content: string

}

export interface IBasePlacement extends IBaseCollectionData { //data linked
    name: string;

}
export interface IBasePosition extends IBaseCollectionData { //data linked
    name: string
}

