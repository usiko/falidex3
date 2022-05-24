import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';

@Component({
	selector: 'app-home-search-result',
	templateUrl: 'home-search-result.component.html',
	styleUrls: ['home-search-resultcomponent.scss'],
})
export class HomeSearchResult {
	constructor(private searchService: globalSearchService) {}

	results$ = this.searchService.searchResult$;
}
