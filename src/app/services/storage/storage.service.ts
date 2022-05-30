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
	public set(key: string, value: any, ageProperty = 'age'):Observable<any> {
		this.database?.set(key, JSON.stringify(value));
		this.saveAge(key, value[ageProperty]);
	}

	// Create and expose methods that users of this service can
	// call, for example:
	public get(key: string, emptyValue:any):Observable<any> {
		JSON.parse(this.database?.get(key));
    }
    
    public remove(key:string): Observable<never>
    {
        return this.database?.remove(key)
    }

	public saveAge(key, value):Observable<any> {
        return this.get('ageIndex', {}).pipe(
            switchMap(data => {
                data[key] = value;
                this.set('ageIndex', data);
            })
        )
		
		
	}

	public getAge(key):Observable<any> {
        return this.get('ageIndex', {}).pipe(map(data => {
            return data[key];
        }))
		
	}
}
