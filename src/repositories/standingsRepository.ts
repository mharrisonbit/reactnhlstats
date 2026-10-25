import { StatsService } from '../api';

export class StandingsRepository {
  constructor(private readonly stats = new StatsService()) {}

  async getStandings(signal?: AbortSignal) {
    return (await this.stats.getStandings('now', signal)).standings;
  }
}
