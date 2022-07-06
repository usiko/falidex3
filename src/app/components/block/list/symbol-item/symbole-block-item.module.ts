import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { SymbolBlockItemGalleryComponent } from './gallery/symbole-block-item-gallery.component';
import { SymbolBlockItemListComponent } from './list/symbole-block-item-list.component';




@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
    ],
    exports: [
        SymbolBlockItemListComponent, SymbolBlockItemGalleryComponent
    ],
    declarations: [SymbolBlockItemListComponent, SymbolBlockItemGalleryComponent],
    providers: []
})
export class SymboleBlockItemModule { }