import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
//import { MenuController, Events } from '@ionic/angular';
import { IonSearchbar, MenuController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent /* implements OnInit, AfterViewInit, OnDestroy*/ {
    @ViewChild(IonSearchbar) searchBar: IonSearchbar;
    @Input() title: string;
    @Input() length: number;
    @Input() searchable = false;
    @Input() filterable = false;
    @Input() autoFocus = false;
    @Output() onsearch = new EventEmitter<string>();

    public searchText = '';
    public isSearching = false;
    constructor(private eventService:EventService) { }


    ngOnInit() {
        if (this.autoFocus && !this.isSearching) {
            this.toggleSearch()
        }
    }
    ngAfterViewInit() {
        if (this.searchBar && this.isSearching) {
            this.searchBar.setFocus();
        }
        else {
            console.warn('no search bar')
        }
    }

    search(search) {
        this.searchText = search.detail.value;
        this.onsearch.emit(this.searchText);
    }
    toggleSearch() {
        this.isSearching = !this.isSearching;
        if (this.searchBar && this.isSearching) {
            this.searchBar.setFocus();
        }
        else {
            console.warn('no search bar')
        }
    }
    toggleFilterMenu() {
        this.eventService.publish('filtersMenu', true);
    }

    ngOnDestroy() {

    }

}
