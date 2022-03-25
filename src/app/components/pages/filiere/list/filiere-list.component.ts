import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import { IFiliere } from 'src/app/models/linked-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { PageItemList } from '../../pages-list';



@Component({
    selector: 'app-filiere-list',
    templateUrl: './filiere-list.component.html',
    styleUrls: ['./filiere-list.component.scss']
})
export class FiliereListComponent extends PageItemList<IFiliere> {

    public pageSize = 15;
    public circulaireMatEnum = CiculaireMatiereEnum;
    constructor(protected collectionService: SymbolCollectionService, protected events: EventService) {
        super();
    }

}
