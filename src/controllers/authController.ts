import { Request, Response } from 'express';
import { generateAuthorizationCode } from '../services/authService';
import { REDIRECT_URI } from '../config';
import { generateAccessToken, generateRefreshToken } from '../services/tokenService';

export const authorize = (req: Request, res: Response) => {
    const { state } = req.query;
  
    // Simulating authorization code generation for now.
    // In the real implementation, this should be replaced with an API call
    // to the authorization server to obtain a valid authorization code.
    const authorizationCode = generateAuthorizationCode(); 
  
    // Constructing the redirect URL with the authorization code.
    // If a state parameter is present, include it in the redirect.
    const redirectUrl = `${REDIRECT_URI}?code=${authorizationCode}${
      state ? `&state=${state}` : ''
    }`;
  
    // Redirecting the user to the redirect URI with the authorization code.
    res.redirect(302, redirectUrl);
  };
  

  export const token = async (req: Request, res: Response): Promise<void> => {
    const { grant_type, code, refresh_token } = req.body;
  
    // Validate that the grant type is either "authorization_code" or "refresh_token".
    // If the grant type is invalid, return a 400 error.
    if (grant_type !== 'authorization_code' && grant_type !== 'refresh_token') {
      res.status(400).json({ error: 'unsupported_grant_type' });
      return;
    }
  
    // Handle the "authorization_code" grant type.
    if (grant_type === 'authorization_code') {
      // Simulating access token generation. 
      // In a real implementation, validate the authorization code before generating the tokens.
      const { accessToken, expiresIn } = await generateAccessToken();
      const refreshToken = await generateRefreshToken();
  
      res.json({
        access_token: accessToken, // Issued access token
        token_type: 'bearer', // OAuth 2.0 token type
        expires_in: expiresIn, // Expiration time in seconds
        refresh_token: refreshToken, // Issued refresh token
      });
      return;
    }
  
    // Handle the "refresh_token" grant type.
    if (grant_type === 'refresh_token') {
      // Simulating access token generation.
      // In a real implementation, validate the refresh token before generating a new access token.
      const { accessToken, expiresIn } = await generateAccessToken();
  
      res.json({
        access_token: accessToken, // Issued access token
        token_type: 'bearer', // OAuth 2.0 token type
        expires_in: expiresIn, // Expiration time in seconds
        // No refresh token is issued again in this flow
      });
      return;
    }
  };