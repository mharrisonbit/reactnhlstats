// Response shapes are intentionally partial; extend as views need more fields.
export interface LocalizedString {
  default: string;
  [locale: string]: string;
}

export interface Standing {
  teamAbbrev: LocalizedString;
  teamName: LocalizedString;
  teamLogo: string;
  teamCommonName?: LocalizedString;
  teamPlaceName?: LocalizedString;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
  [key: string]: unknown;
}
export interface StandingsResponse {
  standingsDateTimeUtc?: string;
  standings: Standing[];
}

export interface GameTeam {
  abbrev: string;
  score?: number;
  logo?: string;
  commonName?: LocalizedString;
  placeName?: LocalizedString;
  [key: string]: unknown;
}

export interface Game {
  id: number;
  startTimeUTC: string;
  gameState: string;
  awayTeam: GameTeam;
  homeTeam: GameTeam;
  [key: string]: unknown;
}
export interface ScheduleResponse {
  gameWeek: { date: string; games: Game[] }[];
}
export interface ScoreResponse {
  currentDate: string;
  games: Game[];
}

export interface RosterPlayer {
  id: number;
  firstName: LocalizedString;
  lastName: LocalizedString;
  positionCode: string;
  sweaterNumber?: number;
  headshot?: string;
  [key: string]: unknown;
}
export interface RosterResponse {
  forwards: RosterPlayer[];
  defensemen: RosterPlayer[];
  goalies: RosterPlayer[];
}

export interface PlayerLanding {
  playerId: number;
  firstName: LocalizedString;
  lastName: LocalizedString;
  position: string;
  currentTeamAbbrev?: string;
  featuredStats?: unknown;
  careerTotals?: unknown;
  [key: string]: unknown;
}

export interface ClubStatsResponse {
  season: string;
  gameType: number;
  skaters: Record<string, unknown>[];
  goalies: Record<string, unknown>[];
}

export interface StatsRestResponse<T> {
  data: T[];
  total: number;
}
export interface Team {
  id: number;
  fullName: string;
  triCode: string;
  [key: string]: unknown;
}
export interface SkaterSummary {
  playerId: number;
  skaterFullName: string;
  teamAbbrevs: string;
  goals: number;
  assists: number;
  points: number;
  gamesPlayed: number;
  [key: string]: unknown;
}

// nhl-score-api (Heroku) response
export interface ScoresApiGame {
  teams: Record<string, { abbreviation: string; teamName: string; locationName: string; shortName: string }>;
  scores: Record<string, number>;
  status: { state: string; progress?: unknown };
  [key: string]: unknown;
}
export interface ScoresApiResponse {
  date: { raw: string; pretty: string };
  games: ScoresApiGame[];
}
