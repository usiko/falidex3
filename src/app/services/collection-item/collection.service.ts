import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { IRelationData, IRelationItem } from 'src/app/models/base-relations.models';
import { ICollectionData, ICollectionLink } from 'src/app/models/linked-data-models';
import {
    ISubBaseCirculaire,
    ISubBaseCollectionData,
    ISubBaseFiliere,
    ISubBasePlacement,
    ISubBasePosition,
    ISubBaseSignification,
    ISubBaseSymbol,
    ISubBaseSymbolAcessory,
    ISubSymbolSens,
} from 'src/app/models/sub-base-data-models';
import { SubStoreService } from '../data-store/sub-store/sub-store.service';

export class ICollectionItem<BaseModel extends ISubBaseCollectionData, LinkedModel extends ICollectionData> {
    protected store: SubStoreService;
    protected baseCollection$: BehaviorSubject<BaseModel[]>;
    protected currentRelation$: BehaviorSubject<IRelationData>;
    public collection$ = new BehaviorSubject<LinkedModel[]>([]);

    public unlinkedCollection$ = new BehaviorSubject<BaseModel[]>([]);

    private runBuild$ = new Subject(); // debouncing assemblage données

    /**
     * able to run init twice and not recall everything in each view
     */
    private initiated = false;
    constructor() {}

    /**
     * init le servive qui va alors se binder au store
     */
    public init() {
        if (!this.initiated) {
            this.initiated = true;
            this.runBuild$
                .pipe(debounceTime(500)) //limitations des appels successifs
                .subscribe(() => {
                    const built = this.buildCollection(this.baseCollection$.getValue(), this.currentRelation$.getValue());
                    this.collection$.next(built);
                });
            this.currentRelation$ = this.store.currentDataRelations$;
            this.currentRelation$.subscribe(() => {
                console.log('relations update');
                this.runBuild$.next();
            });
            this.bindSubjectToBuild(this.baseCollection$);
            this.collection$.subscribe((collection: LinkedModel[]) => {
                // filter used items, but remove dependancies
                const ids = collection.map((item) => item.id);
                const baseCollection = this.baseCollection$.getValue();
                this.unlinkedCollection$.next(
                    ids
                        .map((item) => {
                            return baseCollection.find((item) => ids.includes(item.id));
                        })
                        .filter((item) => !!item)
                );
            });
        }
    }

    public getCollectionSpe(): Observable<LinkedModel[]> {
        return this.collection$.pipe(
            map((items: LinkedModel[]) => {
                return items
                    .map((item) => {
                        const newItem = { ...item };
                        newItem.links = newItem.links.filter((link) => {
                            return link.spe;
                        });
                        return newItem;
                    })
                    .filter((item) => item.links.length > 0);
            })
        );
    }

    /**
     * ajoute une ecoute au store pour rebuild les data
     */
    protected bindSubjectToBuild(subject: BehaviorSubject<IBaseCollectionData[]>) {
        subject.subscribe(() => {
            this.runBuild$.next();
        });
    }

    /**
     * assemble des objets du store en fonctions des ids des relations
     */
    private getLinkedModel(relations: IRelationItem[]): ICollectionLink[] {
        return relations.map((relation) => {
            const returned: ICollectionLink = {};
            if (relation.circulaireId) {
                returned.circulaire = this.store.getItemById(relation.circulaireId, this.store.circulaires$) as ISubBaseCirculaire;
            }
            if (relation.filiereId) {
                returned.filiere = this.store.getItemById(relation.filiereId, this.store.filieres$) as ISubBaseFiliere;
            }
            if (relation.significationId) {
                returned.signification = this.store.getItemById(
                    relation.significationId,
                    this.store.significations$
                ) as ISubBaseSignification;
            }
            if (relation.placementId) {
                returned.placement = this.store.getItemById(relation.placementId, this.store.placements$) as ISubBasePlacement;
            }
            if (relation.positionId) {
                returned.position = this.store.getItemById(relation.positionId, this.store.positions$) as ISubBasePosition;
            }
            if (relation.symboleId) {
                returned.symbols = this.store.getItemById(relation.symboleId, this.store.symboles$) as ISubBaseSymbol;
            }
            if (relation.symboleSensId) {
                returned.symbolsens = this.store.getItemById(relation.symboleSensId, this.store.symbolesSens$) as ISubSymbolSens;
            }
            if (relation.symboleAccessoryId) {
                returned.symboleAccessory = this.store.getItemById(
                    relation.symboleAccessoryId,
                    this.store.symbolesAccessories$
                ) as ISubBaseSymbolAcessory;
            }
            returned.spe = relation.spe;
            returned.note = relation.note;

            return returned;
        });
    }

    //abstract buildCollection(collection: IBaseCollectionData[], relation: IRelationData): LinkedModel[];

    /**
     * build object associés en fonction du store
     */
    private buildCollection(collection: IBaseCollectionData[], relation: IRelationData): LinkedModel[] {
        {
            const returned = [];
            for (const item of collection) {
                const filtered = [];
                if (relation && relation.relations) {
                    filtered.push(...this.linkFinder(item, relation.relations));
                }

                const links = this.getLinkedModel(filtered);
                if (links.length > 0) {
                    returned.push({
                        links,
                        //links: [],
                        ...item,
                    } as LinkedModel);
                } else {
                    console.warn('empty links', item, filtered);
                }
            }
            return returned;
        }
    }

    /**
     * Retourne les link associés a l'item, et supprime la properiété id de l'item en cours
     */
    protected linkFinder(item: ISubBaseCollectionData, links: IRelationItem[]): IRelationItem[] {
        return [];
    }
}
