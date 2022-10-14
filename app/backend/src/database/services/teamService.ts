import Teams from "../models/Teams";
// import { ITeam } from "../interfaces/Team.interface";

// TODO: Falta tipar o retorno
class TeamService {

async getTeams () {
  
  const data = await Teams.findAll();
  return { code: 200, message: data  };

}

  // constructor(private teamRepository: TeamRepository) {}

  // async createTeam(team: Team): Promise<Team> {
  //   return await this.teamRepository.createTeam(team);
  // }

  // async getTeam(id: string): Promise<Team> {
  //   return await this.teamRepository.getTeam(id);
  // }

  // async getTeams(): Promise<Team[]> {
  //   return await this.teamRepository.getTeams();
  // }

  // async updateTeam(id: string, team: Team): Promise<Team> {
  //   return await this.teamRepository.updateTeam(id, team);
  // }

  // async deleteTeam(id: string): Promise<void> {
  //   return await this.teamRepository.deleteTeam(id);
  // }
}

export default TeamService;