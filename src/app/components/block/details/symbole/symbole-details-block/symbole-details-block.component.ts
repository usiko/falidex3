import { Component, Input, OnInit, model, effect } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { IonCard, IonTabBar, IonTabButton, IonLabel, IonBadge } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FiliereNosymbBlockItemListComponent } from "../../../list/filiere/filiere-nosymb-block-item-list/filiere-nosymb-block-item-list.component";
import { SignificationItemBlockComponent } from "../../../list/signification/signification-item-block/signification-item-block.component";
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';

@Component({
    selector: 'app-symbole-details-block',
    templateUrl: './symbole-details-block.component.html',
    styleUrls: ['./symbole-details-block.component.scss'],
    imports: [CommonModule, IonCard, ImgLoaderComponent, IonTabBar, IonTabButton, FaIconComponent, IonLabel, IonBadge, FiliereNosymbBlockItemListComponent, SignificationItemBlockComponent, FilterLinkPipe, SliderComponent, SlideDirective],
})
export class SymboleDetailsBlockComponent implements OnInit {
    @Input() symbol$!: BehaviorSubject<ISymbol>;
    public significations: ISignification[] = [];
    public filieres: IFiliere[] = [];

    public selectedTab: string | undefined;
    public slideIndex = model(0);
    public slidable = true;

    private subscription = new Subscription();
    constructor() {
        effect(() => {
            const index = this.slideIndex();
            if (this.slidable) {
                if (index === 1) {
                    this.selectedTab = 'significations';
                }
                if (index === 0) {
                    this.selectedTab = 'filieres';
                }
            }
        });
    }
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
    }

    private getSignification(links: ICollectionLink[]) {
        return links
            .filter((link) => link.signification)
            .reduce((acc: ISignification[], link) => {
                let signification = acc.find((item) => {
                    link.signification && item.id == link.signification.id;
                });
                if (!signification && link.signification) {
                    signification = {
                        ...link.signification,
                        links: [],
                    };
                }
                if(signification)
                {
                    signification.links.push({
                    ...link,
                    signification: undefined,
                });
                acc.push(signification);
                }
                return acc;
            }, []);
    }
    private getFilieres(links: ICollectionLink[]): IFiliere[] {
        return links
            .filter((link) => link.filiere)
            .reduce((acc: IFiliere[], link) => {
                let filiere = acc.find((item) => {
                     link.filiere && item.id == link.filiere.id;
                });
                if (!filiere && link.filiere) {
                    filiere = {
                        ...link.filiere,
                        links: [],
                    };
                }
                if(filiere)
                {
                    filiere.links.push({
                        ...link,
                        filiere: undefined,
                    });
                    acc.push(filiere);
                }
                return acc;
            }, []);
    }

    slideTo(num: number, event?: Event) {
        if (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        this.slideIndex.set(num);
    }
}
