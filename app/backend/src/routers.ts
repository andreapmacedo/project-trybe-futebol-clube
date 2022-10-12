import { Router, Request, Response } from 'express';
import UserController from './database/controllers/UserController';
// import CourseController from './controllers/CourseController';
// import StudentController from './controllers/StudentController';
// import AuthController from './controllers/AuthController';
// import { ICourse } from './interfaces/Course.interface';
// import authenticationMiddleware from './middlewares/auth.middleware';

const routers: Router = Router();

// const authController = new AuthController();
// routers.post('/auth', (req: Request, res: Response) => authController.auth(req, res));

const userController = new UserController();
// routers.post('/login', (req: Request, res: Response) => userController.create(req, res));
routers.post('/login', (req: Request, res: Response) => userController.getUser(req, res));

// const courseController = new CourseController();
// routers.get('/course', authenticationMiddleware, (req: Request, res: Response) => courseController.getAll(req, res));
// routers.post('/course', (req: Request, res: Response) => courseController.create(req, res));
// routers.put('/course/:id', (req: Request<{ id: number }, {}, ICourse>, res: Response) => courseController.update(req, res));
// routers.delete('/course/:id', (req: Request<{ id: number }>, res: Response) => courseController.remove(req, res));

// const studentController = new StudentController();
// routers.get('/student', (req: Request, res: Response) => studentController.getAll(req, res));
// routers.post('/student', (req: Request, res: Response) => studentController.create(req, res));
// routers.get('/student/:id', (req: Request<{ id: number }, {}, {}, { includeCourse: boolean }>, res: Response) => studentController.getOne(req, res));

export default routers;
