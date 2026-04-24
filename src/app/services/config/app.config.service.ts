import { IConfig } from "src/app/models/config.model";
import { ConfigService } from "./config.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root',
})
export class AppConfigService extends ConfigService<IConfig>{

}