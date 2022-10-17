// const dbTableMatches = 'TRYBE_FUTEBOL_CLUBE.matches';
// const dbTableTeams = 'TRYBE_FUTEBOL_CLUBE.teams';

// export const home = `SELECT
// Team.team_name as name,
// SUM(
//   CASE
//     WHEN Matche.home_team_goals > Matche.away_team_goals THEN 3
//     WHEN Matche.home_team_goals = Matche.away_team_goals THEN 1
//     WHEN Matche.home_team_goals < Matche.away_team_goals THEN 0
//   END
// ) as totalPoints,
// COUNT(Matche.home_team) as totalGames,
// SUM(Matche.home_team_goals > Matche.away_team_goals) as totalVictories,
// SUM(Matche.home_team_goals = Matche.away_team_goals) as totalDraws,
// SUM(Matche.home_team_goals < Matche.away_team_goals) as totalLosses,
// SUM(Matche.home_team_goals) as goalsFavor,
// SUM(Matche.away_team_goals) as goalsOwn,
// SUM(Matche.home_team_goals - Matche.away_team_goals) as goalsBalance
// FROM ${dbTableMatches} as Matche
// INNER JOIN ${dbTableTeams} as Team
// ON Matche.home_team = Team.id AND in_progress = false
// GROUP BY name
// ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

// export const away = `SELECT
// Team.team_name as name,
// SUM(
//   CASE
//     WHEN Matche.away_team_goals > Matche.home_team_goals THEN 3
//     WHEN Matche.home_team_goals = Matche.away_team_goals THEN 1
//     WHEN Matche.away_team_goals < Matche.home_team_goals THEN 0
//   END
// ) as totalPoints,
// COUNT(Matche.away_team) as totalGames,
// SUM(Matche.away_team_goals > Matche.home_team_goals) as totalVictories,
// SUM(Matche.away_team_goals = Matche.home_team_goals) as totalDraws,
// SUM(Matche.away_team_goals < Matche.home_team_goals) as totalLosses,
// SUM(Matche.away_team_goals) as goalsFavor,
// SUM(Matche.home_team_goals) as goalsOwn,
// SUM(Matche.away_team_goals - Matche.home_team_goals) as goalsBalance
// FROM ${dbTableMatches} as Matche
// INNER JOIN ${dbTableTeams} as Team
// ON Matche.away_team = Team.id AND in_progress = false
// GROUP BY name
// ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;