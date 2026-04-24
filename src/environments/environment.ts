// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnv } from "./model";

export const environment:IEnv = {
  production: false,
  configPaths: ["assets/config/config.json"],
  tokenKey: "default_dev_token_hash_please_change",
  token: "token",
  derivationTokenKey: "default_dev_token_hash_please_change",
  donate: false,
  tokenHeader: "X-Token"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
