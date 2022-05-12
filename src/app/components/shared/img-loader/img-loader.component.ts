import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
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
    }

    @Input() errorSrc = '/assets/not-found.svg';

    @Input() errorIcon;

    @Input() objectFit = 'cover';

    constructor() {}

    ngOnInit() {}

    imgError() {
        console.warn('error loading', this.ownSrc);
        this.loading = false;
        if (this.ownSrc !== this.errorSrc) {
            this.ownSrc = this.errorSrc;
        }
    }

    imgLoaded() {
        console.log('img loaded', this.ownSrc);
        this.loading = false;
    }
}
