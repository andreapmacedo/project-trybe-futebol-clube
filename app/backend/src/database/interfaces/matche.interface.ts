import Matches from "../models/Matches";

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

export interface IMatchWithTeams extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export interface IMatchWithTeamsModel extends Matches {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}



