import { BehaviorSubject } from "rxjs"
import { IBaseCollectionData } from "src/app/models/base-data-models";
import { IRelationData } from "src/app/models/base-relations.models";
import { SubjectsStoreService } from "../data-store/subjects-store.service";

export abstract class ICollectionItem {
    protected store: SubjectsStoreService;
    protected baseCollection$: BehaviorSubject<IBaseCollectionData[]>;
    protected currentRelation$: BehaviorSubject<IRelationData>
    public collection$ = new BehaviorSubject<any[]>([]);
    constructor() {


    }
    public init() {
        this.currentRelation$ = this.store.currentDataRelations$;
        this.currentRelation$.subscribe(() => {
            this.collection$.next(this.buildCollection(this.baseCollection$.getValue(), this.currentRelation$.getValue()));
        });
        this.bindSubjectToBuild(this.baseCollection$);

    }

    protected bindSubjectToBuild(subject: BehaviorSubject<IBaseCollectionData[]>) {
        subject.subscribe(() => {
            this.collection$.next(this.buildCollection(this.baseCollection$.getValue(), this.currentRelation$.getValue()));
        })
    }

    abstract buildCollection(collection: IBaseCollectionData[], relation: IRelationData): any[]
}