import { Component, Input } from '@angular/core';
import { GlobalSearchService } from 'src/app/services/globale-search/global-search.service';

@Component({
    selector: 'app-home-search-result',
    templateUrl: 'home-search-result.component.html',
    styleUrls: ['home-search-result.component.scss'],
})
export class HomeSearchResult {
    @Input() pageHeight = 0;
    constructor(private searchService: GlobalSearchService) {}
    searchText: string;
    results$ = this.searchService.searchResult$;
    search(value) {
        this.results$.subscribe((data) => {
            console.log(data);
        });
        this.searchText = value.detail.value;
        this.searchService.updateSearchText(this.searchText);
    }
}
