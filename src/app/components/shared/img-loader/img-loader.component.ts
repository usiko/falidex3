import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
})
export class ImgLoaderComponent implements OnInit {
    public loading = false;
    public ownsrc: string;

    @Input() set src(src: string) {
        this.loading = true;
        //console.log('img change', src, this.errorSrc, this.ownsrc);
        if (src) {
            this.ownsrc = src;
            //console.log('img change', src, this.errorSrc, this.ownsrc);
        }
        else {
            this.ownsrc = this.errorSrc;
            //console.log('img change', src, this.errorSrc, this.ownsrc);
        }
    }

    get src() {
        return this.ownsrc;
    }
    @Input() errorSrc = '/assets/no-image.png';

    @Input() objectFit = 'cover';

    constructor() { }

    ngOnInit() { }

    imgError() {
        console.warn('error loading', this.ownsrc);
        this.loading = false;
        if (this.ownsrc !== this.errorSrc) {
            this.ownsrc = this.errorSrc;
        }

    }

    imgLoaded() {
        console.log('img loaded', this.ownsrc);
        this.loading = false;
    }

}
