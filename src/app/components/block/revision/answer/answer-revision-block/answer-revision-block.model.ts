import { ICollectionData, ICollectionLink, IFiliere } from 'src/app/models/linked-data-models';

export enum RevisionTypenAnswerItemEnum {
    FILIERE = 'filiere',
    CIRCULAIRE = 'circulaire',
    SYMBOL = 'symbole',
}

export interface IAnswer extends ICollectionLink {}
