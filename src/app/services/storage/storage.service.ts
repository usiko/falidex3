import { Storage } from '@ionic/storage-angular';
export class StorageService {
	private database: Storage | null = null;
	constructor(private storage: Storage) {}
	init() {
		return this.storage.create();
		//this.database = storage;
	}
	// Create and expose methods that users of this service can
	// call, for example:
	public set(key: string, value: any, ageProperty = 'age') {
		this.database?.set(key, JSON.stringify(value));
		this.saveAge(key, value[ageProperty]);
	}

	// Create and expose methods that users of this service can
	// call, for example:
	public get(key: string) {
		JSON.parse(this.database?.get(key));
	}

	public saveAge(key, value) {
		const ageIndex = this.get('ageIndex') ? this.get('ageIndex') : {};
		ageIndex[key] = value;
		this.set('ageIndex', ageIndex);
	}

	public getAge(key) {
		const ageIndex = this.get('ageIndex') ? this.get('ageIndex') : {};
		return ageIndex[key];
	}
}
