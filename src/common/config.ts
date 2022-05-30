import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: env !== 'development' ? '.env' : '.env.local',
});

export const appSSL = process.env.APP_SSL === 'true';
export const appPort = process.env.APP_PORT || '8080';
export const appHostName = process.env.APP_HOSTNAME || 'Localhost';
export const appSecretKey = process.env.APP_SECRET_KEY || '27Antz_Secret_Key';
export const appRefreshSecretKey = process.env.APP_REFRESH_SECRET_KEY || '27Antz_Refresh_Secret_Key';
export const appPassphrase = process.env.APP_PASSPHRASE || '27Antz_Passphrase';
export const appTokenExpire = process.env.APP_TOKEN_EXPIRE || '24h';
export const appRefreshTokenExpire = process.env.APP_REFRESH_TOKEN_EXPIRE || '24h';

export const emailFrom = process.env.MAIL_FROM; // 'narasak.man@ustudi.com';
export const emailTransport = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    type: process.env.MAIL_AUTH_TYPE,
    user: process.env.MAIL_AUTH_USER,
    clientId: process.env.MAIL_AUTH_CLIENT_ID,
    clientSecret: process.env.MAIL_AUTH_CLIENT_SECRET,
    refreshToken: process.env.MAIL_AUTH_REFRESH_TOKEN,
    accessToken: process.env.MAIL_AUTH_ACCESS_TOKEN,
  },
};

export const emailSecretPublicKey = process.env.MAIL_AUTH_SECRET_PUBLIC_KEY;

export const appDatabaseUrl = process.env.DATABASE_URL || '';
export const appDatabaseLogUrl = process.env.DATABASE_LOG_URL || '';
