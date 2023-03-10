import { Router, Request, Response } from 'express';
import UserController from './database/controllers/UserController';
import TeamController from './database/controllers/TeamController';
import MatchController from './database/controllers/MatchController';
import LeaderBoardController from './database/controllers/LeaderBoardController';
// import authenticationMiddleware from './middlewares/auth.middleware';
// import Token from './shared/TokenGenerator';
// import auth from './middlewares/Auth';
import tokenHelper from './helpers/tokenHelper';

const routers: Router = Router();


const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();
const leaderBoardController = new LeaderBoardController();
// const validate = new Token();

routers.post('/login', async (req: Request, res: Response) => { 
  const { code, message } = await userController.login(req, res)
  res.status(code).json(message)
})

// routers.get('/login/validate', async (req, res) => {
routers.get('/login/validate', tokenHelper.auth, async (req: Request, res: Response) => {
// routers.get('/login/validate', tokenHelper.auth, async (req: Request, res: Response) => {
  // console.log(res.locals.payload);
  // const { email } = res.locals.payload;
  const { email } = req.body.user;
  // console.log('id', id);
  
  // console.log(email);
  const { code, message } = await userController.getRole(email);
  // console.log(id);
  // console.log(`teste`);
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

routers.get('/matches', async (req: Request, res: Response) => {
  const { inProgress } = req.query; // ?inProgress=true (query string)
  // console.log("inProgress", inProgress);
  const { code, message } = await matchController.getMatches(inProgress);
  res.status(code).json(message)
});

routers.post('/matches', tokenHelper.auth, async (req: Request, res: Response) => {
  const { code, message } = await matchController.createMatch(req.body);
  // console.log(message);
  res.status(code).json(message)
});


routers.patch('/matches/:id/finish', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { code, message } = await matchController.finishMatch(id); 
  // console.log("message", message);
  res.status(code).json(message)
});


routers.patch('/matches/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { code, message } = await matchController.updateMatch(id, homeTeamGoals, awayTeamGoals);
  // console.log("message", message);
  res.status(code).json(message)
});

routers.get('/leaderboard/home', async (req: Request, res: Response) => {
  const { code, message } = await leaderBoardController.leadBoardHome();
  // console.log("message", message);
  res.status(code).json(message)
});

routers.get('/leaderboard/away', async (req: Request, res: Response) => {
  const { code, message } = await leaderBoardController.leadBoardAway();
  // console.log("message", message);
  res.status(code).json(message)
});

export default routers;

