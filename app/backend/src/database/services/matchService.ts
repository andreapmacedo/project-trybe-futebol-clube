import { IMatch } from "../interfaces/matche.interface";
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

  async getMatches (inProgress?: string) {
    
    let matches;
    const ASSOCIATIONS = [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ];

    if (inProgress === undefined) {
      matches = await this._matches.findAll({ include: ASSOCIATIONS });
    } else {
      matches = await this._matches.findAll({
        where: { inProgress: inProgress === 'true' },
        include: ASSOCIATIONS,
      });
    }

    if (!matches || matches.length === 0) {
      return { code: 400, error: { message: 'No matches found' } };
    }

    // const matches = await this._matches.findAll({
    //   include: [{
    //     model: Teams,
    //     as: 'teamHome',
    //     attributes: ['teamName'],
    //   }, {
    //     model: Teams,
    //     as: 'teamAway',
    //     attributes: ['teamName'],
    //   }],
    // });
    // return matches;
    // console.log('matches', matches);
    
    return { code: 200, message: matches  };
  };
  
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


  public async createMatch(body : IMatch) {
    // const {
    //   homeTeam,
    //   awayTeam,
    //   homeTeamGoals,
    //   awayTeamGoals,
    //   inProgress,
    // } = body;   
    console.log('body', body);
    
    const response = await this._matches.create(body);
    return { code: 201, message: response };
  }

  public async finishMatch(id: string) {
    await this._matches.update({ inProgress: 0 }, { where: { id } });
    return { code: 200,  message: 'Finished'  };
  }

  public async updateMatch(id: string, homeTeamGoals: string, awayTeamGoals: string) {
    await this._matches.update({homeTeamGoals, awayTeamGoals}, { where: { id } });
    return { code: 200,  message: 'Updated'  };
  }

}

export default MatchService;