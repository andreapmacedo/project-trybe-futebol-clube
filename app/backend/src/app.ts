import * as express from 'express';
import UserController from './database/controllers/UserController';

import errorMiddleware from './middlewares/http.error.middleware'
// import login from './routes/login.route';
import routers from './routers';


class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(routers);
    // this.app.use(errorMiddleware);
    // here    this.app.use((req, res, next) => {
    // this.app.use(login);
    
    // seu o uso do controller, apenas para verificar se o servidor está funcionando
    // this.app.post('/login', (req, res) => {
    //   console.log(req.body);
    //   res.status(201).send(req.body);
    // });

    // // com o uso do controller 
    // this.app.post('/login', (req, res) => {
    //   UserController.create(req, res); // Esta implementação é possivel pois o método create é estático em UserController
    // });
    

    // com o uso do controller  2
    // this.app.post('/login', (req, res) => {
    //   const userController = new UserController();
    //   // UserController.create(req, res); // Esta implementação é possivel pois o método create é estático em UserController
    //   userController.create(req, res); // Esta implementação é possivel pois o método create é estático em UserController
    // });
    
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
