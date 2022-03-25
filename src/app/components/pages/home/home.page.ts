import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';



@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
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
}
