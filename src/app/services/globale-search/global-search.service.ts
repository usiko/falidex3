@Injectable({
	providedIn: 'root',
})
export class globalSearchService {
	symbols$ = new BehaviorSubject([]);
	filieres$ = new BehaviorSubject([]);
	circulaire$ = new BehaviorSubject([]);
	signification$ = new BehaviorSubject([]);
	codeSpe$ = new BehaviorSubject([]);

	searchResult$ = new BehaviorSubject({
		symbols: [],
		filieres: [],
		circulaire: [],
		signification: [],
		codeSpe: [],
	});

	private searchText;
	constructor(
		private symbolCollection: SymbolColection,
		private filiereCollection: FilierCollection,
		private circulaireCollection: circulaireCollection,
		private significationCollection: SignificationCollection,
		private codeSpeCollection: CodeSpeCollection
	) {}

	init() {
		this.initCollection(this.symbols$, this.symbolCollection.collection$);
		this.initCollection(this.filieres$, this.filiereCollection.collection$);
		this.initCollection(this.circulaire$, this.circulaireCollection.collection$);
		this.initCollection(this.signification$, this.significationCollection.collection$);
		this.initCollection(this.codeSpe$, this.codeSpeCollection.collection$);
	}

	updateSearchText(searchText: string) {
		this.searchText = searchText;
		this.applySearch();
	}

	resetSearch() {
		this.searchResult$.next({
			symbols: [],
			filieres: [],
			circulaire: [],
			signification: [],
			codeSpe: [],
		});
	}

	private applySearch() {
		if (this.searchText && this.searchText.trim().length > 0) {
			this.searchResult$.next({
				symbols: this.searchInCollection(this.symbols$),
				filieres: this.searchInCollection(this.filieres$),
				circulaire: this.searchInCollection(this.circulaire$),
				signification: this.searchInCollection(this.signification$),
				codeSpe: this.searchInCollection(this.codeSpe$),
			});
		} else {
			this.resetSearch();
		}
	}

	private searchInCollection(collection) {
		return collection.filter((item) => {
			return this.searchText.includes(item.name);
		});
	}

	private initCollection(localCollection, storeCollection) {
		storeCollection.subscribe((collection) => {
			localCollection.next(collection);
		});

		localCollection.subscribe(() => {
			this.applySearch();
		});
	}
}
