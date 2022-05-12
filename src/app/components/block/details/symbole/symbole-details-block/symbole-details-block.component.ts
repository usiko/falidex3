import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';

@Component({
    selector: 'app-symbole-details-block',
    templateUrl: './symbole-details-block.component.html',
    styleUrls: ['./symbole-details-block.component.scss'],
})
export class SymboleDetailsBlockComponent implements OnInit {
    @ViewChild('slides') slide: IonSlides;
    @Input() symbol$: BehaviorSubject<ISymbol>;
    public significations: ISignification[] = [];
    public filieres: IFiliere[] = [];

    public selectedTab;
    public slideOptions = {
        autoplay: false,
        pagination: false,
    };
    public slidesIndex$ = new BehaviorSubject(0);

    public slidable = true;

    private subscription = new Subscription();
    constructor() {}
    ngOnInit() {
        if (this.symbol$) {
            this.subscription.add(
                this.symbol$.subscribe((symbol) => {
                    if (symbol && symbol.links) {
                        this.filieres = this.getFilieres(symbol.links);
                        this.significations = this.getSignification(symbol.links);
                        console.log('dep', this.filieres, this.significations);
                        if (this.filieres.length === 0 || this.significations.length === 0) {
                            this.slidable = false;
                            if (this.slide) {
                                if (!this.slidable) {
                                    this.slide.lockSwipes(true);
                                }
                            }
                            if (this.filieres.length !== 0) {
                                this.selectedTab = 'filieres';
                            }
                            if (this.significations.length !== 0) {
                                this.selectedTab = 'significations';
                            }
                        }
                    }
                })
            );
        }

        this.slidesIndex$.subscribe((num) => {
            if (this.slidable) {
                if (num === 1) {
                    this.selectedTab = 'significations';
                }
                if (num === 0) {
                    this.selectedTab = 'filieres';
                }
                if (this.slide) {
                    this.slide.slideTo(num);
                }
            }
        });
    }

    private getSignification(links: ICollectionLink[]) {
        return links
            .filter((link) => link.signification)
            .reduce((acc: ISignification[], link) => {
                let signification = acc.find((item) => {
                    item.id == link.signification.id;
                });
                if (!signification) {
                    signification = {
                        ...link.signification,
                        links: [],
                    };
                }
                signification.links.push({
                    ...link,
                    signification: undefined,
                });
                acc.push(signification);
                return acc;
            }, []);
    }
    private getFilieres(links: ICollectionLink[]): IFiliere[] {
        return links
            .filter((link) => link.filiere)
            .reduce((acc: IFiliere[], link) => {
                let filiere = acc.find((item) => {
                    item.id == link.filiere.id;
                });
                if (!filiere) {
                    filiere = {
                        ...link.filiere,
                        links: [],
                    };
                }
                filiere.links.push({
                    ...link,
                    filiere: undefined,
                });
                acc.push(filiere);
                return acc;
            }, []);
    }

    ngAfterViewInit() {
        if (this.slide) {
            if (!this.slidable) {
                this.slide.lockSwipes(true);
            }
        }
    }

    slideTo(num: number, event?: Event) {
        if (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        this.slidesIndex$.next(num);
    }

    slidesChange(data) {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                if (num !== this.slidesIndex$.getValue()) {
                    this.slidesIndex$.next(num);
                }
            });
        }
    }
}
