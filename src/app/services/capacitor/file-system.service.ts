import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;
export class FileSystemService {
	private delay = 0;
	constructor(private store: StoreService, private event: EventService, private picturePrelaoder: PicturePreloaderService) {}

    /**
     * return path location of picture
     */
	savePicture(path: string, name: string):Observable<string> {
		const fileName = name + '.jpg';
		Filesystem.readFile({
			path: path,
		}).then(() => {
			Filesystem.getUri({
				directory: FilesystemDirectory.Data,
				path: fileName,
			}).then(
				(result) => {
					let path = Capacitor.convertFileSrc(result.uri);
					console.log(path);
				},
				(err) => {
					console.log(err);
				}
			);
		});
	}

	retreivePicture() {}
}
