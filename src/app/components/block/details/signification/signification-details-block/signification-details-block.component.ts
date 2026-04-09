import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire, ISignification } from 'src/app/models/linked-data-models';
import { IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-signification-details-block',
    templateUrl: './signification-details-block.component.html',
    styleUrls: ['./signification-details-block.component.scss'],
    imports: [IonCard, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent],
})
export class SignificationDetailsBlockComponent implements OnInit {
    constructor() {}

    @ViewChild(IonSlides) slide: IonSlides;

    @Input() signification$: BehaviorSubject<ISignification>;
    slideOptions = {
        autoplay: false,
        pagination: true,
    };
    slideIndex = 0;

    ngOnInit() {}

    ngAfterViewInit(): void {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                if (num !== this.slideIndex) {
                    this.slideIndex = num;
                }
            });
        }
    }

    slidesChange(data) {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                if (num !== this.slideIndex) {
                    this.slideIndex = num;
                }
            });
        }
    }

    slideprevious() {
        if (this.slide) {
            this.slide.slidePrev();
        }
    }

    slidenext() {
        if (this.slide) {
            this.slide.slideNext();
        }
    }
}
