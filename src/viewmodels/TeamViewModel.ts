import { useEffect, useState } from 'react';
import { RosterPlayer, Standing } from '../models';
import { TeamRepository } from '../repositories/teamRepository';

const teamRepository = new TeamRepository();

export function useTeamViewModel(teamAbbrev: string | undefined) {
  const [team, setTeam] = useState<Standing | undefined>();
  const [roster, setRoster] = useState<RosterPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!teamAbbrev) {
      setError('No team was specified.');
      setLoading(false);
      return () => controller.abort();
    }

    setLoading(true);
    setError(null);
    teamRepository
      .getTeamDetails(teamAbbrev, controller.signal)
      .then((details) => {
        setTeam(details.standing);
        setRoster(details.roster);
      })
      .catch((e: unknown) => {
        if (!controller.signal.aborted) {
          setError(e instanceof Error ? e.message : 'Unable to load team information.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [teamAbbrev]);

  return { team, roster, loading, error };
}
