import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulaire-details-block',
  templateUrl: './circulaire-details-block.component.html',
  styleUrls: ['./circulaire-details-block.component.scss'],
})
export class CirculaireDetailsBlockComponent implements OnInit {

  constructor() { }

  @ViewChild(IonSlides) slide: IonSlides;

  @Input() circualaire$: BehaviorSubject<ICirculaire>;
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
