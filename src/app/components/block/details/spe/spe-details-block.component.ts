import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICodeSpe } from 'src/app/models/linked-data-models';

@Component({
    selector: 'app-spe-details-block',
    templateUrl: './spe-details-block.component.html',
    styleUrls: ['./spe-details-block.component.scss'],
})
export class SpeDetailsBlockComponent {
    @Input() spe$: BehaviorSubject<ICodeSpe>;
}
