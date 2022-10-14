// import { Request, Response } from "express";

import MatchService from "../services/matchService";

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public async getMatches() {
    const response = await this.service.getMatches();    
    return response
  }

  // public async getTeam(id: string) {
  //   const response = await this.service.getTeam(id);    
  //   return response
  // }

}

export default MatchController;