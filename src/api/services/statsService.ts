import { HttpClient } from '../httpClient';
import { statsUrl } from '../config';
import {
  ClubStatsResponse, PlayerLanding, RosterResponse, ScheduleResponse, ScoreResponse, StandingsResponse,
} from '../../models';

// api-web.nhle.com
export class StatsService {
  constructor(private readonly http: HttpClient = new HttpClient(statsUrl)) {}

  getStandings(date = 'now', signal?: AbortSignal) {
    return this.http.get<StandingsResponse>(`v1/standings/${date}`, undefined, signal);
  }
  getSchedule(date = 'now', signal?: AbortSignal) {
    return this.http.get<ScheduleResponse>(`v1/schedule/${date}`, undefined, signal);
  }
  getScores(date = 'now', signal?: AbortSignal) {
    return this.http.get<ScoreResponse>(`v1/score/${date}`, undefined, signal);
  }
  getRoster(teamAbbrev: string, season = 'current', signal?: AbortSignal) {
    return this.http.get<RosterResponse>(`v1/roster/${teamAbbrev}/${season}`, undefined, signal);
  }
  getClubStats(teamAbbrev: string, season = 'now', signal?: AbortSignal) {
    return this.http.get<ClubStatsResponse>(`v1/club-stats/${teamAbbrev}/${season}`, undefined, signal);
  }
  getPlayer(playerId: number, signal?: AbortSignal) {
    return this.http.get<PlayerLanding>(`v1/player/${playerId}/landing`, undefined, signal);
  }
}
