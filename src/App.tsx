import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import { PhotoPage } from './pages/photo';
import { StatsAge } from './pages/stats-age';
import { StatsBlood } from './pages/stats-blood';
import { StatsGender } from './pages/stats-gender';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/stats/blood" element={<StatsBlood />} />
        <Route path="/stats/gender" element={<StatsGender />} />
        <Route path="/stats/age" element={<StatsAge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
