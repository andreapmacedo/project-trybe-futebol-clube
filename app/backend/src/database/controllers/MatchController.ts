import { IMatch } from "../interfaces/matche.interface";
import MatchService from "../services/matchService";

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }


  public async getMatches(inProgress: any) {
    if (inProgress) {
      const response = await this.service.getMatchesByProgress(inProgress);
        return response
    }
    const response = await this.service.getMatches();
      return response
  }

  public async finishMatch(id: string) {
    const response = await this.service.finishMatch(id);    
    return response
  }
  
  public async updateMatch(id: string, homeTeamGoals: string, awayTeamGoals: string) {
    const response = await this.service.updateMatch(id, homeTeamGoals, awayTeamGoals);    
    return response
  }

}

export default MatchController;