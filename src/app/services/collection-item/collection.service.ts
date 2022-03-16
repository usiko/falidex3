import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IBaseCirculaire, IBaseCollectionData, IBaseFiliere, IBasePlacement, IBaseSignification } from "src/app/models/base-data-models";
import { IRelationData, IRelationItem } from "src/app/models/base-relations.models";
import { ICollectionData, ICollectionLink } from "src/app/models/linked-data-models";
import { SubjectsStoreService } from "../data-store/subjects-store.service";

export abstract class ICollectionItem<BaseModel extends IBaseCollectionData, LinkedModel extends ICollectionData> {
    protected store: SubjectsStoreService;
    protected baseCollection$: BehaviorSubject<BaseModel[]>;
    protected currentRelation$: BehaviorSubject<IRelationData>;
    public collection$ = new BehaviorSubject<LinkedModel[]>([]);

    private runBuild$ = new Subject();
    constructor() {


    }

    /**
     * init le servive qui va alors se binder au store
     */
    public init() {
        this.runBuild$
            .pipe(debounceTime(500)) //limitations des appels successifs
            .subscribe(() => {
                this.collection$.next(this.buildCollection(this.baseCollection$.getValue(), this.currentRelation$.getValue()));
            });
        this.currentRelation$ = this.store.currentDataRelations$;
        this.currentRelation$.subscribe(() => {
            this.runBuild$.next();
        });
        this.bindSubjectToBuild(this.baseCollection$);

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
    private getLinkedModel(relations: IRelationItem[],): ICollectionLink[] {
        return relations.map(relation => {
            const returned: ICollectionLink = {};
            if (relation.circulaireId) {
                returned.circulaire = this.store.getItemById(relation.circulaireId, this.store.circulaires$) as IBaseCirculaire;
            }
            if (relation.filiereId) {
                returned.filiere = this.store.getItemById(relation.filiereId, this.store.filieres$) as IBaseFiliere;
            }
            if (relation.significationId) {
                returned.signification = this.store.getItemById(relation.significationId, this.store.significations$) as IBaseSignification;
            }
            if (relation.placementId) {
                returned.placement = this.store.getItemById(relation.placementId, this.store.placements$) as IBasePlacement;
            }
            if (relation.positionId) {
                returned.position = this.store.getItemById(relation.positionId, this.store.positions$) as IBasePlacement;
            }
            if (relation.symboleId) {
                returned.symbols = this.store.getItemById(relation.symboleId, this.store.symboles$) as IBasePlacement;
            }
            returned.spe = relation.spe;
            returned.note = relation.note;

            return {};
        });
    }

    //abstract buildCollection(collection: IBaseCollectionData[], relation: IRelationData): LinkedModel[];


    /**
     * build object associés en fonction du store
     */
    private buildCollection(collection: IBaseCollectionData[], relation: IRelationData): LinkedModel[] {
        {
            return collection.map(item => {
                const filtered = [];
                for (const rel of relation.relations) {
                    if (rel.significationId === item.id) {
                        filtered.push({
                            ...rel,
                            circulaireId: undefined
                        });
                    }
                }

                return {
                    links: this.getLinkedModel(filtered),
                    //links: [],
                    ...item
                } as LinkedModel;
            });
        }
    }
}
