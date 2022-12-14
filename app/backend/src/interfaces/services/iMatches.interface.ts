import ICustomMatches, { IMatches } from '../matches.interface';

export default interface IMatchesService {
  findAll(): Promise<ICustomMatches[] | IMatches[] | null>
  findInProgress(inProgress: boolean): Promise<IMatches[] | ICustomMatches[] | null>
  finishMatch(id: number): Promise<object>
  createMatche(body: object): Promise<IMatches>
  updateGoals(id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<object>
}
