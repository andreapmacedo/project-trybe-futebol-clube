// import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from './HttpException';
import { IUser } from '../database/interfaces/User.interface';

const SECRET = process.env.SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

// interface IToken {
//   email: string;
//   password: string;
// }

class Token {
  constructor(private jwtConfig?: jwt.SignOptions) {
    if (!jwtConfig) {
      jwtConfig = jwtDefaultConfig;
    }
  }

  // public generateJWTToken(payload: IToken) {
  public generateJWTToken(payload: IUser) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;
    if (!token) {
      // throw new HttpException(401, 'Sem Token');
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const introspection = jwt.verify(token, SECRET);
      req.body.payload = introspection;
      return introspection;
      // o next() vai ser chamado no middleware de onde será chamado o authenticateToken
      // a resposta com o introspection será enviada no middleware onde será adicionado o payload.
      // req.body.payload = introspection;
      // next();
    } catch (e) {
      // new HttpException(401, 'token inválido');
      new HttpException(401,  "message: 'Token must be a valid token'" );
      // return res.status(401).json({ message: 'Token must be a valid token' });
    }
    // try {
    //   const introspection = await jwt.verify(token, SECRET, this.jwtConfig);
    //   return introspection;
    //   // o next() vai ser chamado no middleware de onde será chamado o authenticateToken
    //   // a resposta com o introspection será enviada no middleware onde será adicionado o payload.
    //   // req.body.payload = introspection;
    //   // next();
    // } catch (e) {
    //   // new HttpException(401, 'token inválido');
    //   return res.status(401).json({ message: 'Token must be a valid token' });
    // }
  }
}

export default Token;
