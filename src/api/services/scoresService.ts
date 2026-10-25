import { HttpClient, QueryParams } from '../httpClient';
import { scoresUrl } from '../config';
import { ScoresApiResponse } from '../../models';

// nhl-score-api.herokuapp.com
export class ScoresService {
  constructor(private readonly http: HttpClient = new HttpClient(scoresUrl)) {}

  getLatestScores(signal?: AbortSignal) {
    return this.http.get<ScoresApiResponse>('api/v1/scores/latest', undefined, signal);
  }
  getScores(params: QueryParams, signal?: AbortSignal) {
    return this.http.get<ScoresApiResponse>('api/v1/scores', params, signal);
  }
}
