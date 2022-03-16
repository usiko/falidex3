export interface IRelationItem {
  placementId?: string;
  positionId?: string;
  filiereId?: string;
  symboleId?: string;
  circulaireId?: string,
  significationId?: string;
  spe?: boolean;
  note?: string;
}

export interface IRelationContentSpe {
  id: string;
  name: string;
  text: string;
  article: string;
  note: string;
}

export interface IRelationData {
  name: string;
  relations: IRelationItem[];
  specificites?: IRelationContentSpe[];

}
