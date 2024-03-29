import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ILoadingBarState } from 'src/app/models/global.model';
import { EventService } from 'src/app/services/event/event.service';

@Component({
	selector: 'app-animated-splashscreen',
	templateUrl: './animated-splashscreen.component.html',
	styleUrls: ['./animated-splashscreen.component.scss'],
})
export class AnimatedSplashscreenComponent implements OnInit, OnDestroy {
	constructor(private events: EventService, private router: Router) {}
	public loadingState: ILoadingBarState;
	private subscription = new Subscription();
	static loaded = false;

	ngOnInit() {
		if (AnimatedSplashscreenComponent.loaded) {
			this.router.navigateByUrl('/home');
		} else {
			this.initSubscriptions();
		}
	}

	ionViewDidEnter() {
		if (AnimatedSplashscreenComponent.loaded) {
			this.router.navigateByUrl('/home');
		} else {
			this.initSubscriptions();
		}
	}
	ionViewDidLeave() {
		console.log('unlisten splashLeave');
		this.subscription.unsubscribe();
	}

	ngOnDestroy(): void {
		console.log('unlisten splashLeave');
		this.subscription.unsubscribe();
	}

	private initSubscriptions() {
		this.subscription.unsubscribe();
		this.subscription = new Subscription();
		this.subscription.add(
			this.events.getObs('loadingBarState').subscribe((state: ILoadingBarState) => {
				console.log(state);
				if (state) {
					this.loadingState = state;
					if (state.value == 1) {
						AnimatedSplashscreenComponent.loaded = true;
					}
				}
			})
		);
		console.log('listen plashLeave');
		this.subscription.add(
			this.events.getObs('splashLeave', false).subscribe((value: boolean) => {
				if (value) {
					this.router.navigateByUrl('/home');
				}
			})
		);
	}
}
