import { Request, Response, NextFunction } from 'express';
import { CLIENT_ID, REDIRECT_URI } from '../config';

export const validateAuthRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { client_id, redirect_uri, response_type } = req.query;

    if (client_id !== CLIENT_ID || redirect_uri !== REDIRECT_URI) {
        res.status(400).json({ error: 'invalid_client' });
        return;
    }

    if (response_type !== 'code') {
        res.status(400).json({ error: 'unsupported_response_type' });
        return;
    }

    next();
};

export const validateTokenRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { client_id, redirect_uri, grant_type, code } = req.body;

    if (client_id !== CLIENT_ID || redirect_uri !== REDIRECT_URI) {
      res.status(400).json({ error: 'invalid_client' });
      return;
    }
  
    if (grant_type !== 'authorization_code' && grant_type !== 'refresh_token') {
      res.status(400).json({ error: 'unsupported_grant_type' });
      return;
    }
  
    if (!code) {
      res.status(400).json({ error: 'invalid_grant' });
      return; 
    }
  
    next();
};