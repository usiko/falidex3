import { Component, Input, OnInit } from '@angular/core';
import { Signification } from 'src/app/models/models';

@Component({
	selector: 'app-signification-item-block',
	templateUrl: './signification-item-block.component.html',
	styleUrls: ['./signification-item-block.component.scss'],
})
export class SignificationItemBlockComponent implements OnInit {
	@Input() signification: Signification;

	constructor() { }

	ngOnInit() { }

}
