import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import { IFiliere } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterPreset } from 'src/app/services/filter/filter.preset';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';

@Component({
	selector: 'app-revision',
	templateUrl: './revision.component.html',
	styleUrls: ['./revision.component.scss'],
	providers: [ListManagerService, FilterService],
})
export class RevisionPageComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
