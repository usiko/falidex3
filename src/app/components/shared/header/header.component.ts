import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
//import { MenuController, Events } from '@ionic/angular';
import { InputCustomEvent, MenuController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventService } from 'src/app/services/event/event.service';
import { ILoadingBarState } from '../../../models/global.model';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonBadge, IonButton, IonSearchbar, IonProgressBar, SearchbarCustomEvent } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonBadge, IonButton, FaIconComponent, IonSearchbar, IonProgressBar]
})
export class HeaderComponent /* implements OnInit, AfterViewInit, OnDestroy*/ {
    @ViewChild(IonSearchbar) searchBar: IonSearchbar|undefined;;
    @Input() title: string|undefined;;
    @Input() length: number|undefined;;
    @Input() searchable = false;
    @Input() filterable = false;
    @Input() autoFocus = false;
    @Output() onsearch = new EventEmitter<string>();

    public searchText = '';
    public isSearching = false;

    public loadingState: ILoadingBarState = { enable: false };

    private searchDebouncer = new Subject<string>();
    private searchSubscription = new Subscription()
    constructor(private events: EventService, private menuCtrl: MenuController) {}

    ngOnInit() {
        if (this.autoFocus && !this.isSearching) {
            this.toggleSearch();
        }
        this.events.getObs('loadingBarState')?.subscribe((state: ILoadingBarState) => {
            console.log(state);
            if (state) {
                this.loadingState = state;
            }
        });
    }
    ngAfterViewInit() {
        if (this.searchBar && this.isSearching) {
            this.searchBar.setFocus();
        } else {
            console.warn('no search bar');
        }
    }

    search(search:SearchbarCustomEvent) {
        this.searchText = search.detail.value as string;
        this.searchDebouncer.next(this.searchText);
    }
    toggleSearch() {
        this.isSearching = !this.isSearching;
        if (this.searchBar && this.isSearching) {
            if (this.searchSubscription) {
                this.searchSubscription.unsubscribe();
            }
            this.searchSubscription = this.searchDebouncer.pipe(debounceTime(350)).subscribe((search: string) => {
                this.onsearch.emit(search);
            });
            this.searchBar.setFocus();
        } else {
            if (!this.isSearching) {
                if (this.searchSubscription) {
                    this.searchSubscription.unsubscribe();
                } else {
                    console.warn('no search bar');
                }
            }
        }
    }
    toggleFilterMenu() {
        this.menuCtrl.toggle('filters');
    }

    ngOnDestroy() {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }
}
