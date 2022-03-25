import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import { IFiliere } from 'src/app/models/linked-data-models';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { PageItemList } from '../../pages-list';



@Component({
    selector: 'app-filiere-list',
    templateUrl: './filiere-list.component.html',
    styleUrls: ['./filiere-list.component.scss']
})
export class FiliereListComponent extends PageItemList<IFiliere> implements OnInit {
    showScrollTopBtn = true;
    public pageSize = 15;
    public circulaireMatEnum = CiculaireMatiereEnum;
    constructor(protected collectionService: FiliereCollectionService, protected events: EventService) {
        super();
    }

    ngOnInit() {
        super.init();
    }

}
