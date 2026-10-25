import { Game, GameTeam } from '../models';

export interface GameCardTeamViewModel {
  name: string;
  abbreviation: string;
  logo?: string;
  score?: number;
}

export interface GameCardViewModel {
  awayTeam: GameCardTeamViewModel;
  homeTeam: GameCardTeamViewModel;
  accessibleLabel: string;
  startTime: string;
  status: string;
  isLive: boolean;
  scoreSummary?: string;
}

function getTeamViewModel(team: GameTeam): GameCardTeamViewModel {
  const name =
    team.placeName?.default && team.commonName?.default
      ? `${team.placeName.default} ${team.commonName.default}`
      : team.abbrev;

  return {
    name,
    abbreviation: team.abbrev,
    logo: team.logo,
    score: team.score,
  };
}

function getStatus(state: string) {
  switch (state.toUpperCase()) {
    case 'FUT':
      return 'Scheduled';
    case 'LIVE':
    case 'CRIT':
      return 'Live';
    case 'OFF':
    case 'FINAL':
      return 'Final';
    default:
      return state;
  }
}

function formatStartTime(startTimeUTC: string) {
  const startTime = new Date(startTimeUTC);
  if (Number.isNaN(startTime.getTime())) return startTimeUTC;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(startTime);
}

export function createGameCardViewModel(game: Game): GameCardViewModel {
  const awayTeam = getTeamViewModel(game.awayTeam);
  const homeTeam = getTeamViewModel(game.homeTeam);
  const status = getStatus(game.gameState);
  const hasScore = awayTeam.score !== undefined || homeTeam.score !== undefined;

  return {
    awayTeam,
    homeTeam,
    accessibleLabel: `${awayTeam.name} at ${homeTeam.name}`,
    startTime: formatStartTime(game.startTimeUTC),
    status,
    isLive: status === 'Live',
    scoreSummary: hasScore
      ? `${awayTeam.score ?? '-'} – ${homeTeam.score ?? '-'}`
      : undefined,
  };
}
