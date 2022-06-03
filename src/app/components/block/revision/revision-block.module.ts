import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { RevisionFooterBlockComponent } from './revision-footer-block/revision-footer-block.component';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [SharedModule],
    exports: [SharedModule, RevisionFooterBlockComponent],
    declarations: [RevisionFooterBlockComponent],
    providers: [],
})
export class RevisionBlockModule {}
