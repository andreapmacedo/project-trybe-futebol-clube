// import * as jwt from 'jsonwebtoken';
// import 'dotenv/config';
// import { Request, Response, NextFunction } from 'express';

// interface IToken {
//   id: number;
//   username: string;
// }

// export default class Token {
//   static generateToken(data: IToken) {
//     const { id, username } = data;
//     const payload = {
//       id,
//       username,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
//       expiresIn: '1d',
//       algorithm: 'HS256',
//     });
//     return token;
//   }

//   static validateToken = (req: Request, res: Response, next: NextFunction) => {
//     const authorization = req.headers.authorization as string;
//     if (!authorization) return res.status(401).json({ message: 'Token not found' });
//     try {
//       const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
//       req.body.user = user;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//   };
// }