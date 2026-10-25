import { useParams } from 'react-router-dom';
import { useTeamViewModel } from '../viewmodels/TeamViewModel';
import './TeamDetails.css';

function TeamDetails() {
  const { teamAbbrev } = useParams<{ teamAbbrev: string }>();
  const { team, roster, loading, error } = useTeamViewModel(teamAbbrev);

  if (loading) return <main className="team-details"><p>Loading team information…</p></main>;
  if (error) return <main className="team-details"><p role="alert">Unable to load team: {error}</p></main>;
  if (!team) return <main className="team-details"><p role="alert">Team not found.</p></main>;

  const rosterGroups = [
    { title: 'Forwards', players: roster.filter((player) => player.positionCode !== 'D' && player.positionCode !== 'G') },
    { title: 'Defense', players: roster.filter((player) => player.positionCode === 'D') },
    { title: 'Goalies', players: roster.filter((player) => player.positionCode === 'G') },
  ];

  return (
    <main className="team-details">
      <header className="team-details__header">
        {team.teamLogo && <img className="team-details__logo" src={team.teamLogo} alt="" />}
        <div>
          <p className="team-details__abbreviation">{team.teamAbbrev.default}</p>
          <h1>{team.teamName.default}</h1>
        </div>
      </header>

      <section aria-labelledby="team-record-heading">
        <h2 id="team-record-heading">Current record</h2>
        <dl className="team-details__record">
          <div><dt>Record</dt><dd>{team.wins}-{team.losses}-{team.otLosses}</dd></div>
          <div><dt>Points</dt><dd>{team.points}</dd></div>
          <div><dt>Games played</dt><dd>{team.gamesPlayed}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="team-roster-heading">
        <h2 id="team-roster-heading">Current roster</h2>
        <div className="team-details__roster">
          {rosterGroups.map(({ title, players }) => (
            <section className="team-details__roster-group" key={title} aria-labelledby={`roster-${title}`}>
              <h3 id={`roster-${title}`}>{title}</h3>
              {players.length === 0 ? (
                <p>Roster information is not available.</p>
              ) : (
                <ul>
                  {players.map((player) => (
                    <li key={player.id}>
                      {player.sweaterNumber !== undefined && <span>#{player.sweaterNumber} </span>}
                      {player.firstName.default} {player.lastName.default}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeamDetails;
