import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteNavigation from './Components/SiteNavigation';
import Home from './views/Home';
import TeamDetails from './views/TeamDetails';

function App() {
  return (
    <BrowserRouter>
      <SiteNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams/:teamAbbrev" element={<TeamDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
