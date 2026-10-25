import { StatsService } from '../api';

export class GamesRepository {
  constructor(private readonly stats = new StatsService()) {}

  async getTodaysGames(signal?: AbortSignal) {
    return (await this.stats.getScores('now', signal)).games;
  }
}
