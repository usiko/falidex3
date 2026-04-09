import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GlobalSearchService } from 'src/app/services/globale-search/global-search.service';
import { IonSearchbar, IonList, IonListHeader, IonBadge, IonLabel, IonItemGroup, InputCustomEvent,SearchbarCustomEvent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-search-result',
    templateUrl: 'home-search-result.component.html',
    styleUrls: ['home-search-result.component.scss'],
    imports: [IonSearchbar, IonList, IonListHeader, IonBadge, IonLabel, IonItemGroup, CommonModule],
})
export class HomeSearchResult implements OnInit, OnDestroy {
    @Input() pageHeight = 0;
    private searchDebouncer = new Subject<void>();
    private subscriptions = new Subscription();
    public isSearching = false;
    constructor(private searchService: GlobalSearchService) {}
    searchText: string = ''
    results$ = this.searchService.searchResult$;
    ngOnInit(): void {
        this.subscriptions.add(
            this.searchDebouncer.pipe(debounceTime(350)).subscribe(() => {
                console.log('search with', this.searchText);
                this.searchService.updateSearchText(this.searchText);
                if (this.searchText.length > 0) {
                    this.isSearching = true;
                } else {
                    this.isSearching = false;
                }
            })
        );
    }

    search(value:SearchbarCustomEvent) {
        this.searchText = value.detail.value as string;
        this.searchDebouncer.next(void 0);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
