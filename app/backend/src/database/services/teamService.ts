import Teams from "../models/Teams";
// import { ITeam } from "../interfaces/Team.interface";


class TeamService {

  //TODO: falta tipar o retorno
  async getTeams () {
    const data = await Teams.findAll();
    return { code: 200, message: data  };
  }

  //TODO: falta tipar o retorno
  async getTeam(id: string)  {
    const data = await Teams.findByPk(id);
    return { code: 200, message: data  };
  }
}

export default TeamService;