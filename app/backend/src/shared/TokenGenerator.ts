// import jwt, { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import HttpException from './HttpException';
import { IUser } from '../database/interfaces/User.interface';

const SECRET = process.env.SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: jwt.SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

// interface IToken {
//   email: string;
//   password: string;
// }

class TokenGenerator {
  constructor(private jwtConfig?: jwt.SignOptions) {
    if (!jwtConfig) {
      jwtConfig = jwtDefaultConfig;
    }
  }

  // public generateJWTToken(payload: IToken) {
  public generateJWTToken(payload: IUser) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const introspection = await jwt.verify(token, SECRET, this.jwtConfig);
      return introspection;
    } catch (e) {
      new HttpException(401, 'token inválido');
    }
  }
}

export default TokenGenerator;
