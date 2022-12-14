import MatchesRepository from '../model/repository/matches.repository';
import TeamsRepository from '../model/repository/teams.repository';
import { ILeaderboards } from '../interfaces/leaderbords.interface';
import { IMatches } from '../interfaces/matches.interface';
import ITeams from '../interfaces/teams.interface';

export default class LeaderboardService {
  matchesRepository = new MatchesRepository();
  teamsRepository = new TeamsRepository();

  getTeams = async (): Promise<ITeams[] | null> => {
    const response = await this.teamsRepository.findAll();
    return response;
  };

  getMatchs = async (): Promise<IMatches[] | null> => {
    const response = await this.matchesRepository.findFinishedMatches();
    return response;
  };

  public classificationHome = async () => {
    const arrayTeams = await this.getTeams();
    const arrayMatches = await this.getMatchs();
    if (arrayTeams && arrayMatches) {
      const response = await Promise.all(arrayTeams.map((e) => this.makeObjHome(e, arrayMatches)));
      return this.sort(response);
    }
  };

  public classificationAway = async () => {
    const arrayTeams = await this.getTeams();
    const arrayMatches = await this.getMatchs();
    if (arrayTeams && arrayMatches) {
      const response = await Promise.all(arrayTeams.map((e) => this.makeObjAway(e, arrayMatches)));
      return this.sort(response);
    }
  };

  public classification = async () => {
    const arrayHome = await this.classificationHome();
    const arrayAway = await this.classificationAway();
    const arrayTeams = await this.getTeams();
    if (arrayHome && arrayAway && arrayTeams) {
      const response = await Promise.all(arrayTeams
        .map((e) => this.makeObj(e.teamName, arrayHome, arrayAway)));
      return this.sort(response);
    }
  };

  private objectResult: ILeaderboards = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  makeObjHome = async (team: ITeams, matches: IMatches[]): Promise<ILeaderboards> => {
    const obj = { ...this.objectResult };
    matches.forEach((e) => {
      if (team.id === e.homeTeam) {
        obj.name = team.teamName;
        obj.totalGames += 1;
        if (e.homeTeamGoals > e.awayTeamGoals) obj.totalVictories += 1;
        if (e.homeTeamGoals < e.awayTeamGoals) obj.totalLosses += 1;
        if (e.homeTeamGoals === e.awayTeamGoals) obj.totalDraws += 1;
        obj.totalPoints = obj.totalVictories * 3 + obj.totalDraws;
        obj.goalsFavor += e.homeTeamGoals;
        obj.goalsOwn += e.awayTeamGoals;
        obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
        obj.efficiency = ((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return obj;
  };

  makeObjAway = async (team: ITeams, matches: IMatches[]): Promise<ILeaderboards> => {
    const obj = { ...this.objectResult };
    matches.forEach((e) => {
      if (team.id === e.awayTeam) {
        obj.name = team.teamName;
        obj.totalGames += 1;
        if (e.awayTeamGoals > e.homeTeamGoals) obj.totalVictories += 1;
        if (e.awayTeamGoals < e.homeTeamGoals) obj.totalLosses += 1;
        if (e.awayTeamGoals === e.homeTeamGoals) obj.totalDraws += 1;
        obj.totalPoints = obj.totalVictories * 3 + obj.totalDraws;
        obj.goalsFavor += e.awayTeamGoals;
        obj.goalsOwn += e.homeTeamGoals;
        obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
        obj.efficiency = ((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return obj;
  };

  makeObj = (team: string, arrayHome: ILeaderboards[], arrayAway: ILeaderboards[]) => {
    const obj = { ...this.objectResult };
    arrayAway.forEach((away) => {
      obj.name = team; if (obj.name === away.name) {
        obj.totalGames = away.totalGames; obj.totalVictories = away.totalVictories;
        obj.totalLosses = away.totalLosses; obj.totalDraws = away.totalDraws;
        obj.goalsFavor = away.goalsFavor; obj.goalsOwn += away.goalsOwn;
      }
    });
    arrayHome.forEach((home) => {
      if (obj.name === home.name) {
        obj.totalGames += home.totalGames; obj.totalVictories += home.totalVictories;
        obj.totalLosses += home.totalLosses; obj.totalDraws += home.totalDraws;
        obj.goalsFavor += home.goalsFavor; obj.goalsOwn += home.goalsOwn;
      }
      obj.totalPoints = obj.totalVictories * 3 + obj.totalDraws;
      obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
      obj.efficiency = ((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2);
    }); return obj;
  };

  sort = async (arrayObj: ILeaderboards[]):
  Promise<ILeaderboards[]> => arrayObj.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);
}
