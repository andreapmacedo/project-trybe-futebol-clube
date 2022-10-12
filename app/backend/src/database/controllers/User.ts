import { Request, Response } from "express";
import User from "../models/User";

// primeira implementação sem o uso do service
class UserController {
  static async create(req: Request, res: Response) {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  }
 
// implementação com o uso do service  
// export default class UserController {
//   static async login(email: string, password: string) {
//     const result = await UserServices.login(email, password);
//     return result;
//   }

}

export default UserController;