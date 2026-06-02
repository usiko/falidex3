import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { IonImg, IonSpinner } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
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
    protected _src: string|undefined;
    
    @Input() set src(src: string) {
        this._src = src;
        let fullSrc = this.pictureService.getFullResourceUrl(src);
        if (fullSrc !== this.ownSrc) {
            this.loading = true;
            this.changedetector.detectChanges();
        }
        
        if (fullSrc) {
            // Preload the image
            const img = new Image();
            
            img.onload = () => {
                this.ownSrc = fullSrc;
                this.loading = false;
                this.changedetector.detectChanges();
            };
            
            img.onerror = () => {
                console.warn('Error preloading image:', fullSrc);
                this.ownSrc = this.errorSrc;
                this.loading = false;
                this.changedetector.detectChanges();
            };
            
            img.src = fullSrc;
        } else {
            this.ownSrc = this.errorSrc;
            this.loading = false;
            this.changedetector.detectChanges();
        }
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

    imgLoading() {
        this.loading = true;
    }
}
