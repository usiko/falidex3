import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { IFiliere } from 'src/app/models/linked-data-models';
import { IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-filiere-details-block',
    templateUrl: './filiere-details-block.component.html',
    styleUrls: ['./filiere-details-block.component.scss'],
    imports: [IonCard, CirculaireRepresentationComponent, ImgLoaderComponent, IonButton, FaIconComponent, IonCardHeader, IonCardTitle, IonCardContent],
})
export class FiliereDetailsBlockComponent implements OnInit, AfterViewInit {
    @ViewChild(IonSlides) slide: IonSlides;

    @Input() filiere$: BehaviorSubject<IFiliere>;
    slideOptions = {
        autoplay: false,
        pagination: false,
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
