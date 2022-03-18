import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CircFil, ImgUrl } from 'src/app/models/models';

@Component({
    selector: 'app-circulaire-filiere-view',
    templateUrl: './circulaire-filiere-view.component.html',
    styleUrls: ['./circulaire-filiere-view.component.scss'],
})
export class CirculaireFiliereViewComponent implements OnInit {

    constructor() { }
    @ViewChild('slidesContent') slidesContent: IonSlides;
    @Input() circFils: CircFil[] = [];
    @Input() imgs: ImgUrl[] = undefined;

    slideIndex = 0;

    ngOnInit() {
        this.initSlide();
    }

    initSlide() {

    }

    slidesChange(data) {

        if (this.slidesContent) {
            this.slidesContent.getActiveIndex().then(num => {
                this.slideIndex = num;
            });
        }
    }

    slideprevious() {
        if (this.slidesContent) {
            this.slidesContent.slidePrev();
        }



    }

    slidenext() {
        if (this.slidesContent) {
            this.slidesContent.slideNext();
        }
    }

}
