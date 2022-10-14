import { Router, Request, Response } from 'express';
import UserController from './database/controllers/UserController';
import TeamController from './database/controllers/TeamController';
import MatchController from './database/controllers/MatchController';
import authenticationMiddleware from './middlewares/auth.middleware';



const routers: Router = Router();


const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();

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

routers.get('/teams', async (req: Request, res: Response) => { 
  // res.status(200).send({ message: 'ok' });
  const { code, message } = await teamController.getTeams();
  res.status(code).json(message)
})

routers.get('/teams/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { code, message } = await teamController.getTeam(id);
  res.status(code).json(message)
});

routers.get('/', async (req: Request, res: Response) => {
  const { inProgress } = req.query; 
  const { code, message } = await matchController.getMatches(inProgress);
  res.status(code).json(message)
});

routers.patch('/:id/finish', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { code, message } = await matchController.finishMatch(id);
  res.status(code).json(message)
});

routers.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { code, message } = await matchController.updateMatch(id, homeTeamGoals, awayTeamGoals);
  res.status(code).json(message)
});

export default routers;

