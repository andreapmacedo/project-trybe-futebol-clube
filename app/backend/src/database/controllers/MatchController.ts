import { Request, Response } from "express";
import { IMatch } from "../interfaces/matche.interface";
import MatchService from "../services/matchService";

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  // public async getMatches() {
  //   const response = await this.service.getMatches();    
  //   return response
  // };

  // public async getMatches(req: Request, _res: Response) {
  public async getMatches(inProgress: any) {
    
    if (inProgress) {
      const response = await this.service.getMatchesByProgress(inProgress);
        return response
    }

    const response = await this.service.getMatches();
      return response
  }



  // public async getTeam(id: string) {
  //   const response = await this.service.getTeam(id);    
  //   return response
  // }

}

export default MatchController;