import { FileSystemService } from '../../capacitor/file-system.service';
import { StorageService } from '../../storage/storage.service';

@Injectable({
	providedIn: 'root',
})
export class PicturePreloaderService {
	private delay = 0;
	pictureIndex: { [key: string]: string } = {};
	constructor(private http: HttpClient, private storageService: StorageService, private fileSystem: FileSystemService) {}
	init() {}
	preloadAll(pictures: string[]): void {
		const obs = picures.map((src) => {
			return this.http.get(src).pipe(
				catchError(() => {
					return of(null);
				}),
				switchMap((src) => {
					if (src) {
						return this.fileSystem.savePicture(src);
					} else {
						return of(null);
					}
				}),
				catchError(() => {
					//handle local fail
					return of(null);
				}),
				switchMap((localPath) => {
					if (localPath) {
						return this.updateIndex(src, localPath);
					} else {
						return of(null);
					}
				})
			);
		});
		return forkJoin([...src, removeUnused]);
	}

	getLocalPath(src): string {
		return this.pictureIndex[src] ? this.pictureIndex[src] : src;
	}

	private updateIndex(src: string, localPath: string) {
		return this.storageService.get('pictureIndex', {}).pipe(
			mergeMap((storage) => {
				storage[src] = localPath;
				this.pictureIndex = storage;
				return this.storageService.set('pictureIndex', storage);
			})
		);
	}

	private removeUnused(pictures: string[]) {
		return this.storageService.get('pictureIndex', {}).pipe(
			mergeMap((storage) => {
				const usedKeys = Object.keys(storage).filter((key) => pictures.includes(key));
				const newStorage = {};
				for (const key of usedKeys) {
					newStorage[key] = storage[key];
				}
				this.pictureIndex = newStorage;
				return this.storageService.set('pictureIndex', newStorage);
			})
		);
	}
}
