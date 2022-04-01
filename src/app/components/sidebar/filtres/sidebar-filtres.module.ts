import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { FiltresComponent } from './filtres.component';
import { CirculaireMatieresComponent } from './circulaire-matieres/circulaire-matieres.component';
import { FilterMultipleChoiceComponent } from './filter-multiple-choice/filter-multiple-choice.component';
import { FilterMultipleBooleanComponent } from './filter-multiple-boolean/filter-multiple-boolean.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [FiltresComponent, FilterMultipleChoiceComponent, FilterMultipleBooleanComponent, CirculaireMatieresComponent],
    exports: [FiltresComponent, FilterMultipleBooleanComponent, FilterMultipleChoiceComponent],
    providers: []
})
export class SidebarFiltreModule { }
