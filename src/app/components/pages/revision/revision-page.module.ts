import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { CirculaireRevisionComponent } from './circulaire/circulaire-revision.component';
import { FiliereRevisionComponent } from './filiere/filiere-revision.component';
import { SymbolRevisionComponent } from './symbol/symbol-revision.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [],
    declarations: [SymbolRevisionComponent, FiliereRevisionComponent, CirculaireRevisionComponent],
    providers: [],
})
export class RevisionPagesModule {}
