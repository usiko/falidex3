import { Component, OnInit, Input } from '@angular/core';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import { ICirculaire } from 'src/app/models/linked-data-models';
//import { Circulaire, CiculaireMatiereEnum } from 'src/app/models/models';

@Component({
    selector: 'app-circulaire-representation',
    templateUrl: './circulaire-representation.component.html',
    styleUrls: ['./circulaire-representation.component.scss'],
})
export class CirculaireRepresentationComponent implements OnInit {
    @Input() circulaire: ICirculaire;
    @Input() cssClass = 'horizontal';
    public circulaireMatEnum = CiculaireMatiereEnum;
    constructor() {}

    ngOnInit() {}
}
