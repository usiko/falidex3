import { IBaseCirculaire, IBaseCollectionData, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol } from "./base-data-models";

export interface ICollectionData {
  id: string;

  links: ICollectionLink[];
}

export interface ICollectionLink {
  signification?: IBaseSignification;// link
  placement?: IBasePlacement;
  position?: IBasePosition;
  circulaire?: IBaseCirculaire; // link
  filiere?: IBaseFiliere; // link
  symbols?: IBaseSymbol;
  note?: string;
  spe?: boolean;
}

export interface ICirculaire extends ICollectionData { //data linked
  name: string;
  matiere: string;
}

export interface ICirculaireColor extends ICollectionData { //linked to color
  circulaireId: string;
  colorIds: string[];
}
export interface IColor extends ICollectionData {  //linked to circulaire color
  name: string;
  colorData: string; //couleur hexa rgb ou autre
}

export interface IFiliere extends ICollectionData { //data linked

  name: string;
}

export interface ISymbol extends ICollectionData { //data linked
  name: string;
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
  name: string;

}
export interface IPosition extends ICollectionData { //data linked
  name: string;
}

