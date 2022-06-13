import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { FiliereListComponent } from 'src/app/components/pages/filiere/list/filiere-list.component';
import { SymbolListComponent } from 'src/app/components/pages/symbol/list/symbol-list.component';
import { SelectionListComponent } from 'src/app/components/shared/selection-list/selection-list/selection-list.component';
import { IAnswer, RevisionTypenAnswerEnum } from './answer-revision-block.model';

@Component({
    selector: 'app-answer-revision-block',
    templateUrl: './answer-revision-block.component.html',
    styleUrls: ['./answer-revision-block.component.scss'],
})
export class AnswerRevisionBlockComponent implements OnInit {
    answers: IAnswer[] = [];
    constructor(private modalService: ModalController, private popoverService: PopoverController) {}

    ngOnInit() {
        //this.searchSymbol();
    }

    async addItem() {
        const dismiss$ = new Subject();
        dismiss$.subscribe((type: RevisionTypenAnswerEnum) => {
            this.popoverService.dismiss();
            console.log('onDidDismiss resolved with role', type);
            switch (type) {
                case RevisionTypenAnswerEnum.CIRCULAIRE:
                    this.search(FiliereListComponent);
                    break;
                case RevisionTypenAnswerEnum.SYMBOL:
                    this.search(SymbolListComponent);
                    break;
                case RevisionTypenAnswerEnum.SYMBOLSENS:
                    this.search(SymbolListComponent);
                    break;
                case RevisionTypenAnswerEnum.SIGNIFICATION:
                    this.search(SymbolListComponent);
                    break;
                case RevisionTypenAnswerEnum.FILIERE:
                    this.search(FiliereListComponent);
                    break;
            }
        });
        const popover = await this.popoverService.create({
            component: SelectionListComponent,
            componentProps: {
                options: [
                    {
                        value: RevisionTypenAnswerEnum.SYMBOL,
                        label: 'Insigne/Emblème',
                        icon: 'award',
                    },
                    {
                        value: RevisionTypenAnswerEnum.CIRCULAIRE,
                        label: 'Circulaire',
                        icon: 'circle-notch',
                    },
                    {
                        value: RevisionTypenAnswerEnum.FILIERE,
                        label: 'Filière',
                        icon: 'graduation-cap',
                    },
                    {
                        value: RevisionTypenAnswerEnum.SIGNIFICATION,
                        label: 'Signification',
                        icon: 'book-open',
                    },
                    {
                        value: RevisionTypenAnswerEnum.SYMBOLSENS,
                        label: 'Sens',
                        icon: 'arrows-rotate',
                    },
                ],
                title: 'Quel type de réponse',
                dismiss$: dismiss$,
            },
        });
        await popover.present();
    }

    async search(component) {
        const modal = await this.modalService.create({
            component,
            componentProps: {
                unlinkData: true,
                dismiss$: this.getDismissList(),
            },
        });
        return await modal.present();
    }

    private getDismissList(): Subject<any> {
        const dismiss$ = new Subject();
        dismiss$.subscribe((data) => {
            console.log(data);
            this.modalService.dismiss();
        });
        return dismiss$;
    }
}
