import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.component.html',
    styleUrls: ['home.page.component.scss'],
})
export class HomePageComponent implements OnInit {
    @ViewChild(IonSlides) slide: IonSlides;
    public activeSlide = 0;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {}

    switchTab(num: number) {
        this.activeSlide = num;
        if (this.slide) {
            this.slide.slideTo(num);
        }
    }

    slidesChange(data) {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                this.activeSlide = num;
            });
        }
    }
}
