import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgLoaderComponent implements OnInit {
    public loading = false;
    public ownSrc: string;

    @Input() set src(src: string) {
        this.loading = true;
        //console.log('img change', src, this.errorSrc, this.ownSrc);
        if (src) {
            this.ownSrc = src;
            //console.log('img change', src, this.errorSrc, this.ownSrc);
        } else {
            this.ownSrc = this.errorSrc;

            //console.log('img change', src, this.errorSrc, this.ownSrc);
        }
        this.changedetector.detectChanges();
    }

    @Input() errorSrc = '/assets/not-found.svg';

    @Input() errorIcon;

    @Input() objectFit = 'cover';

    constructor(private changedetector: ChangeDetectorRef) {}

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
        console.log('img loaded', this.ownSrc);
        this.loading = false;
        this.changedetector.detectChanges();
    }
}
