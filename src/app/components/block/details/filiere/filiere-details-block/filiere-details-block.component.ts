import { Component, Input, OnInit, model } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFiliere } from 'src/app/models/linked-data-models';
import { IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

@Component({
    selector: 'app-filiere-details-block',
    templateUrl: './filiere-details-block.component.html',
    styleUrls: ['./filiere-details-block.component.scss'],
    imports: [CommonModule, IonCard, CirculaireRepresentationComponent, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent, SliderComponent, SlideDirective, FilterLinkPipe],
})
export class FiliereDetailsBlockComponent implements OnInit {
    @Input() filiere$!: BehaviorSubject<IFiliere|null>;
    slideIndex = model(0);

    ngOnInit() {}

    previousSlide() {
        this.slideIndex.update(i => i - 1);
    }

    nextSlide() {
        this.slideIndex.update(i => i + 1);
    }
}
