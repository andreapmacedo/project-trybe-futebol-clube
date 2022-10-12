// import { NextFunction, Request, Response } from 'express';
// import TokenGenerator from '../shared/TokenGenerator';

// const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization || '';

//   const tokenGenerator = new TokenGenerator();
//   const payload = await tokenGenerator.authenticateToken(token);

//   res.locals.payload = payload;

//   next();
// };

// export default authenticationMiddleware;
