import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { HomeAbout } from './home-about/home-about.component';
import { HomeSearchResult } from './home-search-result/home-search-result.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule, ScrollingModule],
    exports: [HomeAbout, HomeSearchResult],
    declarations: [HomeAbout, HomeSearchResult],
    providers: [],
})
export class HomePagesModule {}
