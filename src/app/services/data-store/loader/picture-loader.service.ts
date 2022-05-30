@Injectable({
	providedIn: 'root',
})
export class PicturePreloaderService {
	private delay = 0;
	constructor(private http: HttpClient) {}

	preload(pictures: string): void {
		const obs = picures.map((src) => {
			return this.http.get(src).pipe(
				catchError(() => {
					return of({});
				})
			);
		});
		return forkJoin(src);
	}
}
