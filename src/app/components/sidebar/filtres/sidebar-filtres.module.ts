import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { FiltresComponent } from './filtres.component';
import { CirculaireMatieresComponent } from './circulaire-matieres/circulaire-matieres.component';

@NgModule({
    imports: [SharedModule],
    declarations: [FiltresComponent, CirculaireMatieresComponent],
    exports: [FiltresComponent],
    providers: [],
})
export class SidebarFiltreModule {}
