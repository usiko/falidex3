import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IonImg, IonSpinner } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app.config.service';
import { PictureService } from 'src/app/services/picture/picture.service';
import { SatinizeUrlPipe } from '../pipes/satinize-url.pipe';

@Component({
    selector: 'app-img-loader',
    templateUrl: './img-loader.component.html',
    styleUrls: ['./img-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonSpinner, IonImg,CommonModule,SatinizeUrlPipe],
})
export class ImgLoaderComponent implements OnInit {
    public loading = false;
    public ownSrc: string|undefined;
    public base64 = false;

    public subscriptions = new Subscription();
    private _src: string|undefined;;
    @Input() set src(src: string) {
        this._src = src;
        //console.log('img change', src, this.errorSrc, this.ownSrc);
        if (src !== this.ownSrc) {
            this.loading = true;
        }
        if (src) {
            if (this.resource) {
                if (this.getStorageEnabled()) {
                    this.pictureService.getBase64(src).subscribe(
                        (base64) => {
                            this.ownSrc = base64;
                            this.base64 = true;
                            this.loading = false;
                            this.changedetector.detectChanges();
                        },
                        (error) => {
                            this.ownSrc = this.pictureService.getFullResourceUrl(src);
                            this.base64 = false;
                            console.log('error get local', error);
                            this.changedetector.detectChanges();
                        }
                    );
                } else {
                    this.ownSrc = this.pictureService.getFullResourceUrl(src);
                    this.base64 = false;
                    console.log('storage disabled', src);
                    this.changedetector.detectChanges();
                }
            } else {
                this.base64 = false;
                this.ownSrc = src;
                this.changedetector.detectChanges();
            }

            //console.log('img change', src, this.errorSrc, this.ownSrc);
        } else {
            this.ownSrc = this.errorSrc;
            this.changedetector.detectChanges();

            //console.log('img change', src, this.errorSrc, this.ownSrc);
        }
    }

    @Input() resource = false;

    @Input() errorSrc = '/assets/not-found.svg';

    @Input() errorIcon:string|undefined;;

    @Input() objectFit = 'cover';

    constructor(
        private changedetector: ChangeDetectorRef,
        private http: HttpClient,
        private pictureService: PictureService,
        private configService: AppConfigService
    ) {}

    ngOnInit() {
        this.changedetector.detectChanges();
    }

    imgError() {
        if (this.base64 && this._src) {
            this.pictureService.deleteResource(this._src);
        }
        this.base64 = false;
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
        // this.loading = true;
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

    private getStorageEnabled(): boolean {
        const conf = this.configService.getConfig();
        return !!conf?.storeEnabled;
    }
}
