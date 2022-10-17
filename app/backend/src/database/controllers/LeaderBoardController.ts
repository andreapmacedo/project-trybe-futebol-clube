// import { RequestHandler } from 'express';
import leaderBoardService from "../services/leaderBoardService";


class LeaderBoardController {
  private service: leaderBoardService;

  constructor() {
    this.service = new leaderBoardService();
  }

  public leadBoardHome = async () => {
    const response  = await this.service.leadBoardHome();
    return response
  };

  public leadBoardAway = async () => {
    const response = await this.service.leadBoardAway();
    return response
  };
  
}

export default LeaderBoardController;