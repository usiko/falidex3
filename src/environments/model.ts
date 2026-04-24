export interface IEnv {
  production: boolean,
  configPaths: string[],
  tokenKey: string,
  token:string,
  derivationTokenKey: string,
  donate: string|boolean,
  tokenHeader: string
}