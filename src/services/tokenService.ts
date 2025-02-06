import { SignJWT } from 'jose';
import { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../config';
import { parseExpirationTime } from '../utils/parseExpirationTime';

export const generateAccessToken = async () => {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const expiresIn = parseExpirationTime(JWT_EXPIRES_IN);
    const accessToken = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(secret);

    return { accessToken, expiresIn };
};

export const generateRefreshToken = async (): Promise<string> => {
    const secret = new TextEncoder().encode(JWT_SECRET);
  
    const refreshToken = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
      .sign(secret);
  
    return refreshToken;
  };

export const isValidAuthorizationCode = (code: string): boolean => {
    return code === 'SOME_CODE';
};