import { Component, Input, OnInit, model } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonCard } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

@Component({
    selector: 'app-circulaire-details-block',
    templateUrl: './circulaire-details-block.component.html',
    styleUrls: ['./circulaire-details-block.component.scss'],
    imports: [CirculaireRepresentationComponent, CommonModule, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent, IonCard, SliderComponent, SlideDirective, FilterLinkPipe],
})
export class CirculaireDetailsBlockComponent implements OnInit {
    constructor() {}

    @Input() circualaire$!: BehaviorSubject<ICirculaire|null>;
    slideIndex = model(0);

    ngOnInit() {}

    previousSlide() {
        this.slideIndex.update(i => i - 1);
    }

    nextSlide() {
        this.slideIndex.update(i => i + 1);
    }
}
