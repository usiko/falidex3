import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { IFiliere } from 'src/app/models/linked-data-models';


@Component({
    selector: 'app-filiere-details-block',
    templateUrl: './filiere-details-block.component.html',
    styleUrls: ['./filiere-details-block.component.scss'],
})
export class FiliereDetailsBlockComponent implements OnInit {

    @ViewChild(IonSlides) slide: IonSlides;

    @Input() filiere: IFiliere;
    @Input() slideOptions = {
        autoplay: false,
        pagination: false

    };
    @Input() set slideIndex(page: number) {
        if (this.slide && page !== this._slideIndex) {
            this._slideIndex = page;
            this.slide.slideTo(this._slideIndex).then(() => {
                console.log('end');
            }, (err) => {
                console.log(err);
            });
        }
    }
    private _slideIndex = 0;
    get slideIndex() {
        return this._slideIndex;
    }

    @Output() onSlideChange = new EventEmitter<number>();


    ngOnInit() {
        this.slide.getActiveIndex().then(num => {
            if (num !== this.slideIndex) {
                this.slideIndex = num;
                this.onSlideChange.emit(this.slideIndex);
            }

        });
    }

    slidesChange(data) {

        if (this.slide) {
            this.slide.getActiveIndex().then(num => {
                if (num !== this.slideIndex) {
                    this.slideIndex = num;
                    this.onSlideChange.emit(this.slideIndex);
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
