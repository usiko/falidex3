

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
