import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spe-details-block',
    templateUrl: './spe-details-block.component.html',
    styleUrls: ['./spe-details-block.component.scss'],
    imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent,CommonModule],
})
export class SpeDetailsBlockComponent {
    @Input() spe$!: BehaviorSubject<ICodeSpe|null>;
}
