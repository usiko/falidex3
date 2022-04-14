import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * all basic element to share in the whole app
 */
@NgModule({
    imports: [HttpClientModule, CommonModule, FormsModule, IonicModule, RouterModule, FontAwesomeModule],
    exports: [HttpClientModule, CommonModule, FormsModule, IonicModule, RouterModule, FontAwesomeModule],
    providers: [],
})
export class SharedModule {}
