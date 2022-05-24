import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';



@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    @ViewChild(IonSlides) slide: IonSlides;
    activeSlide = 0;
    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        /*this.dataClusters = this.databuilder.getClusters();
        this.route.params.subscribe(params => {
            this.route.queryParams.subscribe(params => {
                if (params.data) {
                    this.updatecluster(params.data);
                    this.router.navigate(['']);
                }
            })
        })*/

    }

    switchTab(num: number)
    {
        this.activeSlide = num;
        if (this.slide) {
            this.slide.slideTo(num);
        }
    }

    slidesChange(data) {
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                this.activeSlide = num;
            });
        }
    }
}
