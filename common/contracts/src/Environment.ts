import { STAGE } from "./STAGE";

export type Environment = {
  STAGE: STAGE;
  IS_OFFLINE?: string;

  DB_PROTOCOL: "mongodb+srv" | "mongodb",
  DB_USER: string,
  DB_PASS: string,
  DB_URL: string,
  DB_NAME: STAGE | "test" | "db",
  DB_PARAMS: string,

  APP_NAME: string,
  ACCOUNT_ORIGIN: string,
  API_DOMAIN: string, // example.com: using this domain in set-cookie ensure sharing between subdomains
  API_DOMAIN_NAME: string, // api.example.com: for serverless domain naming
  API_URL: string,
  ACCESS_CONTROL_ALLOW_HEADERS: string,
  ACCESS_CONTROL_EXPOSE_HEADERS: "ACCESS_CONTROL_ALLOW_HEADERS",

  // serverless config
  profile: string,
  appName: string,
  certificateName: string,

  // https://cloudcoders.xyz/blog/nextauth-credentials-provider-with-external-api-and-login-page/
  AUTH_URL: string,
  JWT_SECRET: string,

  REFRESH_TOKEN_EXPIRE_SECONDS: string,
  JWT_EXPIRES_IN: string,
  TEST_TOKEN: string, // keep it empty in environments higher than local-dev

  CORS: string,
}