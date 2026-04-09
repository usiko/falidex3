import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, viewChild, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import SwiperCore from 'swiper';
import { Swiper, SwiperOptions } from 'swiper/types';
import { IonHeader, IonContent, IonFooter, IonTabBar, IonTabButton, IonLabel, IonCard, IonCardContent, IonText } from "@ionic/angular/standalone";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.component.html',
    styleUrls: ['home.page.component.scss'],
    standalone:true,
    imports: [IonHeader, IonContent, IonFooter, IonTabBar, IonTabButton, IonLabel, IonCard, IonCardContent, IonText,FaIconComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit {
    private swiper : Swiper|undefined = undefined;
    public activeSlide = 0;
      swiperConfig: SwiperOptions = {
    //modules: [Zoom, Navigation, FreeMode, Pagination, Thumbs],
    injectStylesUrls: [],
    centeredSlides: true,
    slidesPerView:1,
    pagination:false,
    navigation: false,
    freeMode: false,
    // Zoom natif Swiper 9 — permet pinch-to-zoom + pan sur mobile
    zoom: false,
    // évite d'injecter dynamiquement des thumbs cassés ici
    watchOverflow: true,
  };

    ngOnInit(): void {
        console.log('reach home!')
    }
    ngAfterViewInit() {
     this.swiper = new SwiperCore('.swiper', this.swiperConfig);
        this.swiper.on('slideChange', () => {
        this.slidesChange()
        });
  }


    switchTab(num: number) {
        this.activeSlide = num;
        if (this.swiper) {
            this.swiper.slideTo(num);
        }
    }

    slidesChange() {
        if (this.swiper) {
            this.activeSlide =  this.swiper.activeIndex;
        }
    }
}
