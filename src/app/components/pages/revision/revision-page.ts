export class RevisionPage<Item> extends PageItemDetail<Item> {
	protected routerService: Router;

	/**
	 * naviguer vers id random de la collection courante
	 */
	navigateToRandomId(): string {
		const collectionIds = this.collection$.getValue().map((item) => item.id);
		const id = collectionIds[this.randomIntFromInterval(0, collectionIds.length - 1)];
		this.routerService.navigate(id);
	}

    /**
     * full overrinding ; on doit bindé une unlinked collection
     */
	protected getCollectionSubject(): BehaviorSubject<Item[]> {
		this.collection$ = this.collectionService.unlinkedCollection$;
	}

    /**
     * override updateitem pour gerer les cas ou l'id n'est plus valable
     */
	protected updateItem() {
		if (this.currentId) {
			const collectionIds = this.collection$.getValue().map((item) => item.id);
			if (!collectionIds.includes(this.currentId)) {
				this.navigateToRandomId();
			} else {
				super.updateItem();
			}
		}
	}

	protected onRouteChange() {
		super.onRouteChange();
		if (!this.currentId) {
			this.navigateToRandomId();
		}
	}

	/**
	 * retourne un nb au hasard, min/max incluent
	 */
	private randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
