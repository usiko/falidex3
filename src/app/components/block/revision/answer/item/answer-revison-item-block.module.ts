import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { CirculaireAnswerRevisonBlockComponent } from './circulaire-answer-revison-block/circulaire-answer-revison-block.component';
import { FiliereAnswerRevisonBlockComponent } from './filiere-answer-revison-block/filiere-answer-revison-block.component';
import { ItemAnswerRevisonBlockComponent } from './item-answer-revison-block/item-answer-revison-block.component';
import { SignificationAnswerRevisonBlockComponent } from './signification-answer-revison-block/signification-answer-revison-block.component';
import { SymbolAnswerRevisonBlockComponent } from './symbol-answer-revison-block/symbol-answer-revison-block.component';
import { SymbolSensAnswerRevisonBlockComponent } from './symbol-sens-answer-revison-block/symbol-sens-answer-revison-block.component';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [SharedModule],
    exports: [SharedModule],
    declarations: [
        CirculaireAnswerRevisonBlockComponent,
        SymbolSensAnswerRevisonBlockComponent,
        SymbolAnswerRevisonBlockComponent,
        SignificationAnswerRevisonBlockComponent,
        FiliereAnswerRevisonBlockComponent,
        ItemAnswerRevisonBlockComponent,
    ],
    providers: [],
})
export class AnswerRevisionBlockItemModule {}
