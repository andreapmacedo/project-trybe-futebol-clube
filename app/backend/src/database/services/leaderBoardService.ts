import Matches from "../models/Matches";
// import { home, away } from "../controllers/sql/queries";

const dbTableMatches = 'TRYBE_FUTEBOL_CLUBE.matches';
const dbTableTeams = 'TRYBE_FUTEBOL_CLUBE.teams';

interface ILeadBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

const home = `SELECT
Team.team_name as name,
SUM(
  CASE
    WHEN Matche.home_team_goals > Matche.away_team_goals THEN 3
    WHEN Matche.home_team_goals = Matche.away_team_goals THEN 1
    WHEN Matche.home_team_goals < Matche.away_team_goals THEN 0
  END
) as totalPoints,
COUNT(Matche.home_team) as totalGames,
SUM(Matche.home_team_goals > Matche.away_team_goals) as totalVictories,
SUM(Matche.home_team_goals = Matche.away_team_goals) as totalDraws,
SUM(Matche.home_team_goals < Matche.away_team_goals) as totalLosses,
SUM(Matche.home_team_goals) as goalsFavor,
SUM(Matche.away_team_goals) as goalsOwn,
SUM(Matche.home_team_goals - Matche.away_team_goals) as goalsBalance
FROM ${dbTableMatches} as Matche
INNER JOIN ${dbTableTeams} as Team
ON Matche.home_team = Team.id AND in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const away = `SELECT
Team.team_name as name,
SUM(
  CASE
    WHEN Matche.away_team_goals > Matche.home_team_goals THEN 3
    WHEN Matche.home_team_goals = Matche.away_team_goals THEN 1
    WHEN Matche.away_team_goals < Matche.home_team_goals THEN 0
  END
) as totalPoints,
COUNT(Matche.away_team) as totalGames,
SUM(Matche.away_team_goals > Matche.home_team_goals) as totalVictories,
SUM(Matche.away_team_goals = Matche.home_team_goals) as totalDraws,
SUM(Matche.away_team_goals < Matche.home_team_goals) as totalLosses,
SUM(Matche.away_team_goals) as goalsFavor,
SUM(Matche.home_team_goals) as goalsOwn,
SUM(Matche.away_team_goals - Matche.home_team_goals) as goalsBalance
FROM ${dbTableMatches} as Matche
INNER JOIN ${dbTableTeams} as Team
ON Matche.away_team = Team.id AND in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;


class leaderBoardService {

  private _match = Matches;

  private table = (matches: ILeadBoard[]) => matches.map((matche) => ({
    name: matche.name,
    totalPoints: Number(matche.totalPoints),
    totalGames: matche.totalGames,
    totalVictories: Number(matche.totalVictories),
    totalDraws: Number(matche.totalDraws),
    totalLosses: Number(matche.totalLosses),
    goalsFavor: Number(matche.goalsFavor),
    goalsOwn: Number(matche.goalsOwn),
    goalsBalance: Number(matche.goalsBalance),
    efficiency: ((Number(matche.totalPoints) / (matche.totalGames * 3)) * 100).toFixed(2),
  }));
  
  
  public leadBoardHome = async () => {
    const [matchs] = (await this._match
      .sequelize?.query(home)) as [any, unknown];

    const data = this.table(matchs);

    return { code: 200, message: data };
  };

  public leadBoardAway = async () => {
    const [matchs] = (await this._match
      .sequelize?.query(away)) as [any, unknown];

    const data = this.table(matchs);

    return { code: 200, message: data };
  };

}

export default leaderBoardService;
