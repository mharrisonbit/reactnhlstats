import { HttpClient, QueryParams } from '../httpClient';
import { basicUrl } from '../config';
import { SkaterSummary, StatsRestResponse, Team } from '../../models';

// api.nhle.com (stats REST)
export class BasicService {
  constructor(private readonly http: HttpClient = new HttpClient(basicUrl)) {}

  getTeams(signal?: AbortSignal) {
    return this.http.get<StatsRestResponse<Team>>('stats/rest/en/team', undefined, signal);
  }
  getSkaterSummary(params: QueryParams = {}, signal?: AbortSignal) {
    return this.http.get<StatsRestResponse<SkaterSummary>>('stats/rest/en/skater/summary', params, signal);
  }
}
