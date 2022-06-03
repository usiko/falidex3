import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AnswerRevisionBlockModule } from './answer/answer-revison-block.module';
import { RevisionFooterBlockComponent } from './revision-footer-block/revision-footer-block.component';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [SharedModule, AnswerRevisionBlockModule],
    exports: [SharedModule, RevisionFooterBlockComponent, AnswerRevisionBlockModule],
    declarations: [RevisionFooterBlockComponent],
    providers: [],
})
export class RevisionBlockModule {}
