import { IEnv } from "./model";

export const environment:IEnv = {
  production: true,
  configPaths: ["assets/config/config.json","assets/config/config.prod.json"],
  tokenKey: "{ENV:TOKEN_HASH_KEY}",
  token: "token",
  derivationTokenKey: "{ENV:DERIVATED_TOKEN_HASH_KEY}",
  donate: "{ENV:DONATE}",
  donateUrl: "{ENV:DONATE_URL}",
  tokenHeader: "X-Token",
  overloadMessageRandFactor:"{ENV:OVERLOAD_MESSAGE_RAND_FACTOR}",
  envDevPwd:"{ENV:DEV_PWD}"
};
