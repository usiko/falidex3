import { Component, computed, input, output } from '@angular/core';
import { ICollectionLink, ISignification } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';
interface IDisplay extends ICollectionLink  { 
    displayInfo:string
}

@Component({
    selector: 'app-signification-block-item-list',
    templateUrl: './signification-block-item-list.component.html',
    styleUrls: ['./signification-block-item-list.component.scss'],
    imports: [CommonModule, RouterModule, IonItem, IonLabel, FaIconComponent,FilterLinkPipe],
})
export class SignificationBlockItemListComponent {
    item = input.required<ISignification>();
    displayLinks = computed<IDisplay[]>(()=>{
    const signification  = this.item()
    return signification.links.map(link=>{
        let displaylinks:string[] = [];
        if(link.symbols?.name)
        {
            displaylinks.push(link.symbols?.name)
        }
        if(link.symbolsens?.name)
        {
            displaylinks.push(link.symbolsens?.name)
        }
        if(link.position?.name)
        {
            displaylinks.push(link.position?.name)
        }
        if(link.symboleAccessory?.name)
        {
            displaylinks.push(link.symboleAccessory?.name)
        }
        return {
            ...link,
            displayInfo:displaylinks.join(', '),
        }
    });
})

    /**
     * show navigation arrow
     */
    navigation = input<string|null>(null);

    onclick = output<void>();

    constructor() {}

    click() {
        this.onclick.emit();
    }
}
