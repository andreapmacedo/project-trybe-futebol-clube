// import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../database/interfaces/User.interface';

// const SECRET = process.env.SECRET ;
const SECRET = process.env.SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

interface IToken {
  email: string;
  password: string;
}



import 'dotenv/config';


const { JWT_SECRET } = process.env;
const JWT_CONFIG: object = { algorithm: 'HS256', expiresIn: '1d' };


class Token {
  // constructor(private jwtConfig?: jwt.SignOptions) {
  //   if (!jwtConfig) {
  //     jwtConfig = jwtDefaultConfig;
  //   }
  // }

  // // public generateJWTToken(payload: IToken) {
  // public generateJWTToken(payload: IUser) {
  //   return jwt.sign(payload, SECRET, this.jwtConfig);
  // }

  static createToken(payload: string) {
    const token = jwt.sign(payload, JWT_SECRET as string, JWT_CONFIG);
    return token;
  }


  static generateToken(data: IToken, res: Response) {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    res.locals.payload = data;
    return token;
  }


  static validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization as string;
    console.log(authorization);
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    // const { email } = res.locals.payload;
    
    try {
      const dados = jwt.verify(authorization, JWT_SECRET as string);
      // return dados;
      res.locals.payload = dados;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

}

export default Token;
