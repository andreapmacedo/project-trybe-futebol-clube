import { Op } from 'sequelize';
import { IMatch } from "../interfaces/matche.interface";
import Matches from "../models/Matches";
import Teams from "../models/Teams";
// import { ITeam } from "../interfaces/Team.interface";


class MatchService {

  
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

  //TODO: falta tipar o retorno
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
  
  //TODO: falta tipar o retorno
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
    const {
      homeTeam,
      awayTeam,
      // homeTeamGoals,
      // awayTeamGoals,
      // inProgress,
    } = body;   
    // console.log('body', body);
    
    // console.log('homeTeam', homeTeam);
    // console.log('awayTeam', awayTeam);
    
    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }

    const hasTeams = await this._matches.findAll({
      where: { [Op.or]: [{ id: homeTeam }, { id: awayTeam }] },
    });

    if (hasTeams.length !== 2) {
      return { code: 404, message: 'There is no team with such id!' };
    }

    const response = await this._matches.create(body);
    return { code: 201, message: response };
  }

  //TODO: falta tipar o retorno
  public async finishMatch(id: string) {
    await this._matches.update({ inProgress: 0 }, { where: { id } });
    return { code: 200,  message: 'Finished'  };
  }

  //TODO: falta tipar o retorno
  public async updateMatch(id: string, homeTeamGoals: string, awayTeamGoals: string) {
    await this._matches.update({homeTeamGoals, awayTeamGoals}, { where: { id } });
    return { code: 200,  message: 'Updated'  };
  }

}

export default MatchService;