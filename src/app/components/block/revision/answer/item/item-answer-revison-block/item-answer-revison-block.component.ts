import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from '../../answer-revision-block/answer-revision-block.model';

@Component({
    selector: 'app-item-answer-revison-block',
    templateUrl: './item-answer-revison-block.component.html',
    styleUrls: ['./item-answer-revison-block.component.scss'],
})
export class ItemAnswerRevisonBlockComponent implements OnInit {
    @Input() answer: IAnswer;
    constructor() {}

    ngOnInit() {}
}
