import { Component } from '@angular/core';
import { globalSearchService } from 'src/app/services/globale-search/global-search.service';

@Component({
    selector: 'app-home-search-result',
    templateUrl: 'home-search-result.component.html',
    styleUrls: ['home-search-result.component.scss'],
})
export class HomeSearchResult {
    constructor(private searchService: globalSearchService) {}

    results$ = this.searchService.searchResult$;
}
