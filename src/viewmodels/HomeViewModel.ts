import { useEffect, useState } from 'react';
import { StandingsRepository } from '../repositories/standingsRepository';
import { GamesRepository } from '../repositories/gamesRepository';
import { Game, Standing } from '../models';

const standingsRepo = new StandingsRepository();
const gamesRepo = new GamesRepository();

export function useHomeViewModel() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      standingsRepo.getStandings(controller.signal),
      gamesRepo.getTodaysGames(controller.signal),
    ])
      .then(([s, g]) => {
        setStandings(s);
        setGames(g);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { standings, games, loading, error };
}
