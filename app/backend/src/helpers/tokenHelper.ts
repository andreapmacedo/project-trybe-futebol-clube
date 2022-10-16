// const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;
const secret: string = 'akldhkjladadhjksvdhj';
// const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '1d' };

class tokenHelper {
  
  static createToken = (payload: object) => {
    // const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
    // const token = jwt.sign(payload, JWT_SECRET as string, JWT_CONFIG);
    // const token = jwt.sign(payload, JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1d' });
    const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
    return token;
  };
  
  static verifyToken = (token: string) => {
    // const dados = jwt.verify(token, JWT_SECRET);
    const dados = jwt.verify(token, JWT_SECRET as string);
    console.log('dados: ', dados);
    
    return dados;
  };
  
  // static decodeToken = (token: string) => {
  //   // const dados = jwt.decode(token, JWT_SECRET);
  //   const dados = jwt.decode(token, process.env.JWT_SECRET);
  //   return dados;
  // };


  static auth = (req: Request, res: Response, next: NextFunction) => {
    // console.log('req.headers: ', req.headers);
    // const authorization = req.headers.authorization as string;
    const { authorization} = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      // console.log('authorization: ', authorization);
      console.log(secret);
      
      // const user = this.verifyToken(authorization);
      // const user = jwt.verify(authorization, JWT_SECRET as string);
      const user = jwt.verify(authorization, secret);
      // const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
      console.log('user: ', user);
      req.body.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
   
}

export default tokenHelper;

