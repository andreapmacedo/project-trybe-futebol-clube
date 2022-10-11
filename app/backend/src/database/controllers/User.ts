import { Request, Response } from "express";
import User from "../models/User";

// primeira implementação
export default class UserController {
  static async create(req: Request, res: Response) {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  }

  // public async login(req: Request, res: Response): Promise<Response> {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) {
  //     return res.status(401).json({ message: 'Invalid email or password' });
  //   }
  //   const isValidPassword = await user.checkPassword(password);
  //   if (!isValidPassword) {
  //     return res.status(401).json({ message: 'Invalid email or password' });
  //   }
  //   const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });
  //   return res.json({ user, token });
  // }
}