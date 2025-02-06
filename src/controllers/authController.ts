import { Request, Response } from 'express';
import { generateAuthorizationCode } from '../services/authService';
import { REDIRECT_URI } from '../config';
import { generateAccessToken, generateRefreshToken, isValidAuthorizationCode } from '../services/tokenService';

export const authorize = (req: Request, res: Response) => {
  const { state } = req.query;
  const authorizationCode = generateAuthorizationCode();

  const redirectUrl = `${REDIRECT_URI}?code=${authorizationCode}${
    state ? `&state=${state}` : ''
  }`;
  res.redirect(302, redirectUrl);
};

export const token = async (req: Request, res: Response): Promise<void> => {
    const { grant_type, code, refresh_token } = req.body;

  if (grant_type !== 'authorization_code' && grant_type !== 'refresh_token') {
    res.status(400).json({ error: 'unsupported_grant_type' });
    return;
  }
  if (grant_type === 'authorization_code') {
    if (!isValidAuthorizationCode(code)) {
      res.status(400).json({ error: 'invalid_grant' });
      return;
    }

    const { accessToken, expiresIn } = await generateAccessToken();
    res.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: expiresIn,
    });
    return;
  }
  if (grant_type === 'refresh_token') {
    const refreshToken = await generateRefreshToken();
    const { accessToken, expiresIn } = await generateAccessToken();

    res.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: expiresIn,
      refresh_token: refreshToken, 
    });
    return;
  }
};