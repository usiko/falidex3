import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISymbol } from 'src/app/models/linked-data-models';

@Component({
    selector: 'app-symbole-details',
    templateUrl: './symbole-details.component.html',
    styleUrls: ['./symbole-details.component.scss'],
})
export class SymboleDetailsComponent implements OnInit {
    constructor() {}
    public symbol$: BehaviorSubject<ISymbol>;
    ngOnInit() {
        this.dataService.initData();
        this.dataService.details(this.route.snapshot.params.id).subscribe((data) => {
            console.log(data);
            this.symbole = data.data;
            this.significations = this.symbole.significations;
            this.filieres = this.symbole.circFil.map((circFil) => {
                const filiere = new Filiere(circFil.filiere.name, circFil.filiere.id);
                filiere.circSymboles.push({
                    symbole: null,
                    circulaire: circFil.circulaire,
                    spe: circFil.spe,
                });
                return filiere;
            });
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
        });

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
}
