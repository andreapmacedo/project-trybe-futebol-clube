import { Request, Response } from "express";
import { IUser, IUserCreate } from "../interfaces/User.interface";
import UserServices from "../services/UserService";

// primeira implementação sem o uso do service
// class UserController {
  
//   static async create(req: Request, res: Response) {
//     const newUser = await User.create(req.body);
//     return res.status(201).json(newUser);
//   }
 
// // implementação com o uso do service  
// // export default class UserController {
// //   static async login(email: string, password: string) {
// //     const result = await UserServices.login(email, password);
// //     return result;
// //   }

// }

class UserController {
  private service: UserServices;

  constructor() {
    this.service = new UserServices();
  }


  // public async create(req: Request<{}, {}, IUser>, res: Response) {
  public async getUser(req: Request<{}, {}, IUser>, res: Response) {
    const response = await this.service.login(req.body);
    // return res.status(200).json(response);
    return response
  }
  
  // public async getRole(req: Request<{}, {}, IUserCreate>, res: Response) {
  //   const response = await this.service.login(req.body);
  //   return response
  // }
}

export default UserController;