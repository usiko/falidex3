import { Component, OnInit, Input } from '@angular/core';
//import { Circulaire, CiculaireMatiereEnum } from 'src/app/models/models';

@Component({
    selector: 'app-circulaire-representation',
    templateUrl: './circulaire-representation.component.html',
    styleUrls: ['./circulaire-representation.component.scss'],
})
export class CirculaireRepresentationComponent implements OnInit {
    @Input() circulaire;// Circulaire;
    @Input() cssClass = 'horizontal';
    //public circulaireMatEnum = CiculaireMatiereEnum;
    constructor() { }

    ngOnInit() { }

}
