import { Router, Request, Response } from 'express';
import UserController from './database/controllers/UserController';
import authenticationMiddleware from './middlewares/auth.middleware';

// import CourseController from './controllers/CourseController';
// import StudentController from './controllers/StudentController';
// import AuthController from './controllers/AuthController';
// import { ICourse } from './interfaces/Course.interface';
// import authenticationMiddleware from './middlewares/auth.middleware';

const routers: Router = Router();

// const authController = new AuthController();
// routers.post('/auth', (req: Request, res: Response) => authController.auth(req, res));
// routers.post('/login', (req: Request, res: Response) => userController.create(req, res));
const userController = new UserController();


routers.post('/login', async (req: Request, res: Response) => { 
  const { code, message } = await userController.login(req, res)
  res.status(code).json(message)
})

// routers.get('/login/validate', async (req, res) => {
routers.get('/login/validate', authenticationMiddleware, async (_req, res: Response) => {
  // console.log(res.locals.payload);
  const { email } = res.locals.payload;
  // console.log(email);
  const { code, message } = await userController.getRole(email);
  // console.log(message);
  res.status(code).json(message);
});


export default routers;
