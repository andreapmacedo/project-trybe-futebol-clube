import Matches from "../models/Matches";
// import { ITeam } from "../interfaces/Team.interface";


class MatchService {

  //TODO: falta tipar o retorno
  async getMatches () {
    const data = await Matches.findAll();
    return { code: 200, message: data  };
  }

  //TODO: falta tipar o retorno
  // async getTeam(id: string)  {
  //   const data = await Matches.findByPk(id);
  //   return { code: 200, message: data  };
  // }
}

export default MatchService;