import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PicturePreloaderService } from 'src/app/services/data-store/loader/picture-loader.service';
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
    public localPath: string;

    public subscriptions = new Subscription();

    @Input() set src(src: string) {
        //console.log('img change', src, this.errorSrc, this.ownSrc);
        if (src !== this.ownSrc) {
            // this.loading = true;
        }
        if (src) {
            this.localPath = this.pictureLoader.getLocalPath(src);
            this.ownSrc = this.localPath ? this.localPath : src;
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

    constructor(private changedetector: ChangeDetectorRef, private pictureLoader: PicturePreloaderService, private http: HttpClient) {}

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
