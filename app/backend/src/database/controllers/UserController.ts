import { Request, Response } from "express";
import { IUser, IUserCreate } from "../interfaces/User.interface";
import UserServices from "../services/UserService";

class UserController {
  private service: UserServices;

  constructor() {
    this.service = new UserServices();
  }

  public async login(req: Request<{}, {}, IUser>, res: Response) {
    const response = await this.service.login(req.body, res);    
    return response
  }
  
  public async getRole(email: string) {   
    const response = await this.service.getRole(email);
    return response
  }
}

export default UserController;