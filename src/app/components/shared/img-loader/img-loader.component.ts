import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, Input, OnInit } from '@angular/core';
import { IonImg, IonSpinner } from "@ionic/angular/standalone";

import { PictureService } from 'src/app/services/picture/picture.service';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonSpinner, IonImg,CommonModule],
})
export class ImgLoaderComponent implements OnInit {
    private changedetector = inject(ChangeDetectorRef);
    private pictureService = inject(PictureService);
    public loading = false;
    public ownSrc: string|undefined;
    src = input<(string|undefined)[]>([]);

    constructor() {
        effect(() => {
            const srcs = this.src();
            const fullSrcs = srcs.map(s => this.pictureService.getFullResourceUrl(s)).filter(Boolean) as string[];
            this.loading = true;
            this.changedetector.detectChanges();
            this.tryPreloadImgs(fullSrcs);
        });
    }


    @Input() errorSrc = '/assets/not-found.svg';

    @Input() errorIcon:string|undefined;;

    @Input() objectFit = 'cover';



    ngOnInit() {
        this.changedetector.detectChanges();
    }

    imgError() {
        console.warn('error loading', this.ownSrc);
        this.loading = false;
        if (this.ownSrc !== this.errorSrc) {
            this.ownSrc = this.errorSrc;
            this.changedetector.detectChanges();
        }
    }

    imgLoaded() {
        this.loading = false;
        this.changedetector.detectChanges();
        // todo save if no localpath
        /*if (!this.localPath) {
            this.pictureLoader.save(this.ownSrc);
        }*/
    }

    private preloadImg(fullSrc: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = fullSrc;
        });
    }

    private async tryPreloadImgs(srcs: string[]): Promise<void> {
        for (const src of srcs) {
            try {
                await this.preloadImg(src);
                this.ownSrc = src;
                this.loading = false;
                this.changedetector.detectChanges();
                return;
            } catch {
                console.warn('Error preloading image:', src);
            }
        }
        // All failed
        this.ownSrc = this.errorSrc;
        this.loading = false;
        this.changedetector.detectChanges();
    }

    imgLoading() {
        this.loading = true;
    }
}
