import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
	selector: 'app-spe-details-block',
	templateUrl: './spe-details-block.component.html',
	styleUrls: ['./spe-details-block.component.scss'],
})
export class SpeDetailsBlockComponent {
	@Input() spe$: BehaviorSubject<ICodeSpe>;
}
