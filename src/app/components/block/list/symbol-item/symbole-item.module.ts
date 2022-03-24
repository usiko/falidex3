import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { SymboleItemGalleryComponent } from './symbole-item-gallery/symbole-item-gallery.component';
import { SymboleItemListComponent } from './symbole-item-list/symbole-item-list.component';




@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
    ],
    exports: [
        SymboleItemListComponent, SymboleItemGalleryComponent
    ],
    declarations: [SymboleItemListComponent, SymboleItemGalleryComponent],
    providers: []
})
export class SymboleItemModule { }