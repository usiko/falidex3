import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonCard } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-circulaire-details-block',
    templateUrl: './circulaire-details-block.component.html',
    styleUrls: ['./circulaire-details-block.component.scss'],
    imports: [CirculaireRepresentationComponent, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent, IonCard],
})
export class CirculaireDetailsBlockComponent implements OnInit {
    constructor() {}

    @ViewChild(IonSlides) slide: IonSlides;

    @Input() circualaire$: BehaviorSubject<ICirculaire>;
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
