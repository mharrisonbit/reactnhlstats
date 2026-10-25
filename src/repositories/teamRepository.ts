import { StatsService } from '../api';
import { RosterPlayer, Standing } from '../models';

export interface TeamDetails {
  standing?: Standing;
  roster: RosterPlayer[];
}

export class TeamRepository {
  constructor(private readonly stats = new StatsService()) {}

  async getTeamDetails(teamAbbrev: string, signal?: AbortSignal): Promise<TeamDetails> {
    const [standingsResponse, rosterResponse] = await Promise.all([
      this.stats.getStandings('now', signal),
      this.stats.getRoster(teamAbbrev, 'current', signal),
    ]);

    const standing = standingsResponse.standings.find(
      (team) => team.teamAbbrev.default.toUpperCase() === teamAbbrev.toUpperCase(),
    );
    const roster = [
      ...rosterResponse.forwards,
      ...rosterResponse.defensemen,
      ...rosterResponse.goalies,
    ];

    return { standing, roster };
  }
}
