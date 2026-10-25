import { useEffect, useState } from 'react';
import { StandingsRepository } from '../repositories/standingsRepository';
import { Standing } from '../models';

const defaultRepo = new StandingsRepository();

// Example ViewModel hook: Views consume state only, never call services directly.
export function useStandingsViewModel(repo: StandingsRepository = defaultRepo) {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    repo
      .getStandings(controller.signal)
      .then(setStandings)
      .catch((e) => !controller.signal.aborted && setError(e.message))
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
  }, [repo]);

  return { standings, loading, error };
}
