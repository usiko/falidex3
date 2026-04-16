import { Component, contentChildren, AfterViewInit, OnDestroy, model, effect, viewChild, ElementRef } from '@angular/core';
import { SlideDirective } from './slide.directive';
import { CommonModule } from '@angular/common';
import SwiperCore from 'swiper';
import { SwiperOptions, Swiper } from 'swiper/types';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [CommonModule, SlideDirective]
})
export class SliderComponent implements AfterViewInit, OnDestroy {

  slides = contentChildren(SlideDirective);
  index = model(0);

  swiperContainer = viewChild.required<ElementRef>('swiperContainer');
  private swiperInstance?: Swiper;

  swiperConfig: SwiperOptions = {
    injectStylesUrls: [],
    centeredSlides: true,
    slidesPerView: 1,
    pagination: false,
    navigation: false,
    freeMode: false,
    zoom: false,
    watchOverflow: true,
  };

  constructor() {
    effect(() => {
      // Écoute les changements de 'index' pour forcer la navigation
      const currentIndex = this.index();
      if (this.swiperInstance && this.swiperInstance.activeIndex !== currentIndex) {
        this.swiperInstance.slideTo(currentIndex);
      }
    });
  }

  ngAfterViewInit() {
    // Initialisation du Swiper dans le composant réutilisable
    this.swiperInstance = new SwiperCore(this.swiperContainer().nativeElement, this.swiperConfig);
    
    // Si l'index initial est différent de 0, on se déplace
    if (this.index() !== 0) {
      this.swiperInstance.slideTo(this.index());
    }

    // Émettre les changements quand le slide change
    this.swiperInstance.on('slideChange', () => {
      if (this.swiperInstance && this.index() !== this.swiperInstance.activeIndex) {
        this.index.set(this.swiperInstance.activeIndex);
      }
    });
  }

  ngOnDestroy() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
  }

}
