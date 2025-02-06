import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const CLIENT_ID = process.env.CLIENT_ID || 'upfirst';
export const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8081/process';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;