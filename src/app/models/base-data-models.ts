export interface IBaseCirculaire { //data linked
    id: string;
    name: string;
    matiere: string;
}

export interface IBaseCirculaireColor { //linked to color
    circulaireId: string;
    colorIds: string[]
}
export interface IBaseColor {  //linked to circulaire color
    id: string
    name: string;
    colorData: string //couleur hexa rgb ou autre
}

export interface IBaseFiliere { //data linked
    id: string,
    name: string
}

export interface IBaseSymbol { //data linked
    id: string;
    name: string;
    imgs: {
        id: string,
        url: string
    }[]

}
export interface IBaseSignification {  //data linked
    id: string,
    content: string

}

export interface IBasePlacement { //data linked
    name: string;
    id: string;

}
export interface IBasePosition { //data linked
    id: string,
    name: string
}

