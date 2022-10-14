import Matches from "../models/Matches";
import Teams from "../models/Teams";
// import { ITeam } from "../interfaces/Team.interface";


class MatchService {

  //TODO: falta tipar o retorno
  // async getMatches () {
  //   const data = await Matches.findAll();
  //   return { code: 200, message: data  };
  // }
  private _matches = Matches;
  private _isInProgress: number;  
  
  private convertInProgress(inProgress: string): number {
    if (inProgress === 'false') {
      this._isInProgress = 0;
      return this._isInProgress;
    }
    this._isInProgress = 1;

    return this._isInProgress;
  }

  async getMatches () {
    const matches = await this._matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    // return matches;
    return { code: 200, message: matches  };
  }
  
  async getMatchesByProgress (query: string)   {
    const matchStatus = this.convertInProgress(query);

    const matches = await this._matches.findAll({ where: { inProgress: matchStatus },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return { code: 200, message: matches  };
  }


}

export default MatchService;