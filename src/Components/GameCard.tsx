import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Game } from "../models";
import {
  createGameCardViewModel,
  GameCardTeamViewModel,
} from "../viewmodels/GameCardViewModel";
import "./GameCard.css";

interface GameCardProps {
  game: Game;
  children?: ReactNode;
}

function TeamRow({
  team,
  side,
}: {
  team: GameCardTeamViewModel;
  side: "away" | "home";
}) {
  return (
    <div className="game-card__team">
      {team.logo && <img className="game-card__logo" src={team.logo} alt="" />}
      <Link className="game-card__team-name" to={`/teams/${encodeURIComponent(team.abbreviation)}`}>
        {team.name}
      </Link>
      <span className="game-card__abbrev">{team.abbreviation}</span>
      {team.score !== undefined && (
        <span className={`game-card__score game-card__score--${side}`}>
          {team.score}
        </span>
      )}
    </div>
  );
}

function GameCard({ game, children }: GameCardProps) {
  const viewModel = createGameCardViewModel(game);

  return (
    <article className="game-card" aria-label={viewModel.accessibleLabel}>
      <header className="game-card__header">
        <time className="game-card__time" dateTime={game.startTimeUTC}>
          {viewModel.startTime}
          <span className="game-card__timezone"> Local time</span>
        </time>
        <span
          className={`game-card__status${viewModel.isLive ? " game-card__status--live" : ""}`}
        >
          {viewModel.isLive && (
            <span className="game-card__live-indicator" aria-hidden="true" />
          )}
          {viewModel.status}
        </span>
      </header>

      <div className="game-card__teams">
        <TeamRow team={viewModel.awayTeam} side="away" />
        <TeamRow team={viewModel.homeTeam} side="home" />
      </div>

      {viewModel.scoreSummary && (
        <p className="game-card__score-summary">{viewModel.scoreSummary}</p>
      )}

      {children && <div className="game-card__details">{children}</div>}
    </article>
  );
}

export default GameCard;
