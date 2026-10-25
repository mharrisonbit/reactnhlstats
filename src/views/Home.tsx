import { useHomeViewModel } from '../viewmodels/HomeViewModel';
import { Link } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import './Home.css';

function Home() {
  const { standings, games, loading, error } = useHomeViewModel();

  if (loading) return <main className="home"><p>Loading NHL stats…</p></main>;
  if (error) return <main className="home"><p role="alert">Error: {error}</p></main>;

  return (
    <main className="home">
      <h1>NHL Stats</h1>

      <h2>Today's Games</h2>
      {games.length === 0 ? (
        <p>No games today.</p>
      ) : (
        <ul className="home__games">
          {games.map((g) => (
            <li key={g.id}>
              <GameCard game={g} />
            </li>
          ))}
        </ul>
      )}

      <h2>Standings</h2>
      <ol className="home__standings">
        {standings.map((s) => (
          <li key={s.teamAbbrev.default}>
            <Link to={`/teams/${encodeURIComponent(s.teamAbbrev.default)}`}>{s.teamName.default}</Link>
            {' – '}{s.points} pts ({s.wins}-{s.losses}-{s.otLosses})
          </li>
        ))}
      </ol>
    </main>
  );
}

export default Home;
