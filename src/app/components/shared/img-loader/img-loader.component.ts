import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgLoaderComponent implements OnInit {
    public loading = false;
    public ownSrc: string;

    subscriptions = new Subscription();

    @Input() set src(src: string) {
        //console.log('img change', src, this.errorSrc, this.ownSrc);
        if (src !== this.ownSrc) {
            // this.loading = true;
        }
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

    constructor(private changedetector: ChangeDetectorRef, private http: HttpClient) {}

    ngOnInit() {
        console.warn(' img loaded', this.ownSrc);
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
        console.warn(' img loaded', this.ownSrc);
        this.loading = false;
        this.changedetector.detectChanges();
    }

    imgLoading() {
        this.loading = true;
    }

    private loadImg(imgUrl: string) {
        if (imgUrl) {
            this.subscriptions.add(
                this.http.get(imgUrl).subscribe(
                    () => {
                        this.ownSrc = imgUrl;
                    },
                    () => {
                        this.ownSrc = this.errorSrc;
                    }
                )
            );
        } else {
            this.ownSrc = this.errorSrc;
        }
    }
}
