import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ISymbol } from 'src/app/models/linked-data-models';

@Component({
    selector: 'app-symbole-details-block',
    templateUrl: './symbole-details-block.component.html',
    styleUrls: ['./symbole-details-block.component.scss'],
})
export class SymboleDetailsBlockComponent implements OnInit {
    constructor() {}

    @ViewChild('slides') slide: IonSlides;
    @Input() symbol$: BehaviorSubject<ISymbol>;
    public selectedTab;
    public slideOptions = {
        autoplay: false,
        pagination: false,
    };
    public slidesIndex$ = new BehaviorSubject(0);

    public slidable = true;
    ngOnInit() {
        if (this.symbol$) {
            // load filiere from symbol
            // loadsignifications
        }
        /*this.dataService.initData();
      this.dataService.details(this.route.snapshot.params.id).subscribe(data => {
          console.log(data);
          this.symbole = data.data;
          this.significations = this.symbole.significations;
          this.filieres = this.symbole.circFil.map((circFil => {
              const filiere = new Filiere(circFil.filiere.name, circFil.filiere.id);
              filiere.circSymboles.push({
                  symbole: null,
                  circulaire: circFil.circulaire,
                  spe: circFil.spe
              });
              return filiere;
          }));
          if (this.filieres.length === 0 || this.significations.length === 0) {
              this.slidable = false;
              if (this.slide) {
                  if (!this.slidable) {
                      this.slide.lockSwipes(true);
                  }
              }
              if (this.filieres.length !== 0) {
                  this.selectedTab = 'filieres';
              }
              if (this.significations.length !== 0) {
                  this.selectedTab = 'significations';
              }
          }


      });*/

        this.slidesIndex$.subscribe((num) => {
            if (this.slidable) {
                if (num === 1) {
                    this.selectedTab = 'significations';
                }
                if (num === 0) {
                    this.selectedTab = 'filieres';
                }
                if (this.slide) {
                    this.slide.slideTo(num);
                }
            }
        });
    }

    ngAfterViewInit() {
        if (this.slide) {
            if (!this.slidable) {
                this.slide.lockSwipes(true);
            }
        }
    }

    slideTo(num: number, event?: Event) {
        if (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        this.slidesIndex$.next(num);
    }

    slidesChange(data) {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                if (num !== this.slidesIndex$.getValue()) {
                    this.slidesIndex$.next(num);
                }
            });
        }
    }
}
