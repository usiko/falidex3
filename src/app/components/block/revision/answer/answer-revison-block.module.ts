import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AnswerRevisionBlockComponent } from './answer-revision-block/answer-revision-block.component';
import { AnswerRevisionBlockItemModule } from './item/answer-revison-item-block.module';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [SharedModule, AnswerRevisionBlockItemModule],
    exports: [SharedModule, AnswerRevisionBlockComponent],
    declarations: [AnswerRevisionBlockComponent],
    providers: [],
})
export class AnswerRevisionBlockModule {}
