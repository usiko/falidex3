import { Component, computed, input } from '@angular/core';
import { ICollectionLink, ISignification } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

interface IDisplay extends ICollectionLink  { 
    displayInfo:string
}


@Component({
    selector: 'app-signification-item-block',
    templateUrl: './signification-item-block.component.html',
    styleUrls: ['./signification-item-block.component.scss'],
    imports: [IonItem, IonLabel, FaIconComponent,CommonModule,FilterLinkPipe],
})
export class SignificationItemBlockComponent {
    signification = input.required<ISignification>();

    displayLinks = computed<IDisplay[]>(()=>{
        const signification  = this.signification()
        return signification.links.map(link=>{
            let displaylinks:string[] = [];
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

    constructor() { }
}
