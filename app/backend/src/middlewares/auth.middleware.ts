import { NextFunction, Request, Response } from 'express';
import Token from '../shared/TokenGenerator';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers.authorization || '';

  const auth = new Token();
  // const payload = await tokenGenerator.authenticateToken(token);
  const payload = await auth.authenticateToken(req, res, next);

  // console.log('payload', payload);
  
  res.locals.payload = payload;
  

  next();
};

export default authenticationMiddleware;
