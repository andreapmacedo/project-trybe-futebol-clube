import Matches from "../models/Matches";

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

const homes = `SELECT
T.team_name as name,
SUM(
  CASE
    WHEN M.home_team_goals > M.away_team_goals THEN 3
    WHEN M.home_team_goals = M.away_team_goals THEN 1
    WHEN M.home_team_goals < M.away_team_goals THEN 0
  END
) as totalPoints,
COUNT(M.home_team) as totalGames,
SUM(M.home_team_goals > M.away_team_goals) as totalVictories,
SUM(M.home_team_goals = M.away_team_goals) as totalDraws,
SUM(M.home_team_goals < M.away_team_goals) as totalLosses,
SUM(M.home_team_goals) as goalsFavor,
SUM(M.away_team_goals) as goalsOwn,
SUM(M.home_team_goals - M.away_team_goals) as goalsBalance
FROM ${dbTableMatches} as M
INNER JOIN ${dbTableTeams} as T
ON M.home_team = T.id AND in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const aways = `SELECT
T.team_name as name,
SUM(
  CASE
    WHEN M.away_team_goals > M.home_team_goals THEN 3
    WHEN M.home_team_goals = M.away_team_goals THEN 1
    WHEN M.away_team_goals < M.home_team_goals THEN 0
  END
) as totalPoints,
COUNT(M.away_team) as totalGames,
SUM(M.away_team_goals > M.home_team_goals) as totalVictories,
SUM(M.away_team_goals = M.home_team_goals) as totalDraws,
SUM(M.away_team_goals < M.home_team_goals) as totalLosses,
SUM(M.away_team_goals) as goalsFavor,
SUM(M.home_team_goals) as goalsOwn,
SUM(M.away_team_goals - M.home_team_goals) as goalsBalance
FROM ${dbTableMatches} as M
INNER JOIN ${dbTableTeams} as T
ON M.away_team = T.id AND in_progress = false
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
      .sequelize?.query(homes)) as [any, unknown];

    const data = this.table(matchs);

    return { code: 200, message: data };
  };

  public leadBoardAway = async () => {
    const [matchs] = (await this._match
      .sequelize?.query(aways)) as [any, unknown];

    const data = this.table(matchs);

    return { code: 200, message: data };
  };

}

export default leaderBoardService;
