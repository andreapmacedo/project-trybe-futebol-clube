// // import jwt, { SignOptions } from 'jsonwebtoken';
// import * as jwt from 'jsonwebtoken';
// // import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';
// import HttpException from './HttpException';

// const SECRET = process.env.SECRET || "akldhkjladadhjksvdhj";

// const jwtDefaultConfig: any = {
//   expiresIn: '15m',
//   algorithm: 'HS256',
// }

// class TokenGenerator {

//   constructor (private jwtConfig?: any) {
//     if (!jwtConfig) {
//       jwtConfig = jwtDefaultConfig
//     }
//   }

//   public generateJWTToken(payload: any) {
//     return jwt.sign(payload, SECRET, this.jwtConfig);
//   }

//   public async authenticateToken(token: string) {
//     if (!token) {
//       throw new HttpException(401, "Sem Token");
//     }

//     try {
//       const introspection = await jwt.verify(token, SECRET, this.jwtConfig);
//       return introspection;
//     } catch (e) {
//       new HttpException(401,"token inválido");
//     }
  
//   }

// }

// export default TokenGenerator;