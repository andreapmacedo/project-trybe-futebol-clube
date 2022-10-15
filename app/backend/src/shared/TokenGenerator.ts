// import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../database/interfaces/User.interface';

const SECRET = process.env.SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

interface IToken {
  email: string;
  password: string;
}

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


  static generateToken(data: IToken) {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  }


  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization as string;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
      console.log(`token`);
      
      req.body.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

}

export default Token;
