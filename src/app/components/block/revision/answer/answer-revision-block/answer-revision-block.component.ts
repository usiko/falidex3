import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymbolListComponent } from 'src/app/components/pages/symbol/list/symbol-list.component';
import { IAnswer } from './answer-revision-block.model';

@Component({
    selector: 'app-answer-revision-block',
    templateUrl: './answer-revision-block.component.html',
    styleUrls: ['./answer-revision-block.component.scss'],
})
export class AnswerRevisionBlockComponent implements OnInit {
    answers: IAnswer[] = [];
    constructor(private modalService: ModalController) {}

    ngOnInit() {
        this.searchSymbol();
    }
    async searchSymbol() {
        const modal = await this.modalService.create({
            component: SymbolListComponent,
            componentProps: {
                unlinkData: true,
                backFooterBtn: true,
            },
        });
        return await modal.present();
    }

    SearchFiliere() {
        console.log('ok');
    }
}
