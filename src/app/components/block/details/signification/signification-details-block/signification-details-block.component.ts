import { Component, Input, OnInit, model } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire, ISignification } from 'src/app/models/linked-data-models';
import { IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';

@Component({
    selector: 'app-signification-details-block',
    templateUrl: './signification-details-block.component.html',
    styleUrls: ['./signification-details-block.component.scss'],
    imports: [CommonModule, IonCard, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent, SliderComponent, SlideDirective],
})
export class SignificationDetailsBlockComponent implements OnInit {
    constructor() {}

    @Input() signification$!: BehaviorSubject<ISignification|null>;
    slideIndex = model(0);

    ngOnInit() {}

    previousSlide() {
        this.slideIndex.update(i => i - 1);
    }

    nextSlide() {
        this.slideIndex.update(i => i + 1);
    }
}
