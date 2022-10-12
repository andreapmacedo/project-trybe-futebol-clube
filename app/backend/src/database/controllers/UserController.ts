import { Request, Response } from "express";
import { IUser } from "../interfaces/User.interface";
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

  // public async getAll(req: Request, res: Response) {
  //   const courses = await this.service.getCourses();
  //   return res.status(200).json(courses);
  // }

  // public async create(req: Request<{}, {}, IUser>, res: Response) {
  public async getUser(req: Request<{}, {}, IUser>, res: Response) {
    const token = await this.service.login(req.body);
    return res.status(200).json(token);
  }

  // public async update(req: Request<{ id: number }, {}, ICourse>, res: Response) {
  //   const { id } = req.params;
  //   const isUpdated = await this.service.updateCourse(id, req.body);
  //   if (isUpdated) {
  //     return res.status(200).json({ message: `Curso ${id} atualizado com sucesso` });
  //   }
  //   res.status(404).json({ message: `Curso ${id} não alterado.` });
  // }

  // public async remove(req: Request<{ id: number }>, res: Response) {
  //   const { id } = req.params;
  //   const isRemoved = await this.service.removeCourse(id);
  //   if (isRemoved) {
  //     return res.status(200).json({ message: `Curso ${id} removido com sucesso` });
  //   }
  //   res.status(404).json({ message: `Curso ${id} não removido` });
  // }
}

export default UserController;