import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICirculaire, ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseCirculaire, ISubBaseFiliere, ISubBaseSignification } from 'src/app/models/sub-base-data-models';
import { ListItem } from '../../list-item';


@Component({
    selector: 'app-symbole-item-list',
    templateUrl: './symbole-item-list.component.html',
    styleUrls: ['./symbole-item-list.component.scss'],
})
export class SymboleItemListComponent extends ListItem<ISymbol> implements OnInit {

    @Input() item: ISymbol;
    @Input() showSpe = true;
    @Input() navigation = false;

    // Todo -> pipe
    public circulairesFilieresLink: ICollectionLink[] = []

    public significationsLink: ICollectionLink[] = []

    constructor() {
        super()
    }

    ngOnInit() { }

    click() {
        this.onclick.emit();
    }

    protected itemChange(): void {
        this.circulairesFilieresLink = [];
        this.significationsLink = []
        if (this.item.links) {
            for (const link of this.item.links) {
                if (link.signification) {
                    this.significationsLink.push(link)
                }
                if (link.filiere && link.circulaire) {
                    this.circulairesFilieresLink.push(
                        link
                    )
                }
            }
        }
    }

}
