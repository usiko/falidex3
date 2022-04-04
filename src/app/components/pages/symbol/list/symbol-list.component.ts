import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { DisplayFilters } from '../../../../models/filters/filter-model';
import { PageItemList } from '../../pages-list';

@Component({
	selector: 'app-symbol-list',
	templateUrl: './symbol-list.component.html',
	styleUrls: ['./symbol-list.component.scss'],
	providers: [ListManagerService, FilterService],
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
	showScrollTopBtn = true;
	constructor(
		protected collectionService: SymbolCollectionService,
		protected events: EventService,
		protected listManagerService: ListManagerService<ISymbol>,
		protected changeDetector: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.setSort('name', SortEnum.asc);
		super.init();
		this.initDisplayFilters([
			new DisplayFilters({
				label: 'Type de circulaire',
				filters: [],
			}),
			new DisplayFilters({
				label: 'specificité',
				filters: [],
			}),
		]);
	}
}
