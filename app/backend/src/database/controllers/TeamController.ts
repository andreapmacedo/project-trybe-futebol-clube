// import { Request, Response } from "express";

import TeamService from "../services/teamService";

class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getTeams() {
    const response = await this.service.getTeams();    
    return response
  }

}

export default TeamController;