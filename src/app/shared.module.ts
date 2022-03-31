

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/**
 * all basic element to share in the whole app
 */
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    providers: []
})
export class SharedModule { }
