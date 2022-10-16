// const jwt = require('jsonwebtoken');
// const tokenHelper = require('../../helpers/tokenHelper');
// import { NextFunction, Request, Response } from "express";
// import tokenHelper from '../helpers/tokenHelper'; 


// // impl - 5

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const authorization = req.headers.authorization as string;
//   if (!authorization) return res.status(401).json({ message: 'Token not found' });
//   try {
//     const user = tokenHelper.verifyToken(authorization);
//     req.body.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token must be a valid token' });
//   }
// };

// export default auth;




// impl - 4
// const auth = async (req: Request, res: Response, next: NextFunction) => {
//   // const { authorization } = req.headers;
//   const  authorization  = req.headers.authorization;
//   try {
//     if (!authorization) return res.status(401).json({ message: 'missing auth token' });
//     const data = tokenHelper.verifyToken(authorization);
//     // console.log('data', data);
//     // console.log('teste');
    
//     next();
//   } catch (error) {
//     // res.status(401).json({ message: error.message });
//     res.status(401).json({ message: 'Token must be a valid token' });
//   }
// };
// // module.exports = { auth };
// export default auth;

// impl - 3
// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   try {
//     if (!authorization) return res.status(401).json({ message: 'missing auth token' });
//     const data = jwt.verify(authorization, 'qualquercoisa');
//     console.log('data', data);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// };
// module.exports = { auth };

// // impl - 2
// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) return res.status(401).json({ message: 'missing auth token' });
//   const data = jwt.verify(authorization, 'qualquercoisa');
//   console.log('data', data);
//   next();
// };

// module.exports = { auth };

// impl - 1
// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) return res.status(401).json({ message: 'missing auth token' });
//   next();
// };

// module.exports = { auth };

// original
// const joi = require('joi');

// const userSchema = joi.object({
//   username: joi.string().min(3).max(20).required(),
//   password: joi.string().min(6).max(10).required(),
// });

// const userValidation = (req, res, next) => {
//   const { error } = userSchema.validate(req.body);
//   if (error) return res.status(422).json({ message: error.message });
//   next();
// };

// // const validation = { userValidation, phraseValidation };

// module.exports = { userValidation };
