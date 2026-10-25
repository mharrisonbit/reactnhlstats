import { Link } from 'react-router-dom';
import './SiteNavigation.css';

function SiteNavigation() {
  return (
    <nav className="site-navigation" aria-label="Main navigation">
      <Link className="site-navigation__brand" to="/">NHL Stats</Link>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default SiteNavigation;
