import { ICollectionData, ICollectionLink, IFiliere } from 'src/app/models/linked-data-models';

export enum RevisionTypenAnswerEnum {
    FILIERE = 'filiere',
    CIRCULAIRE = 'circulaire',
    SYMBOL = 'symbol',
    SYMBOLSENS = 'symbol-sens',
    SIGNIFICATION = 'signifiaction',
}

export interface IAnswer extends ICollectionLink {}
