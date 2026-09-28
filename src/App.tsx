import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecruitmentPage from './pages/RecruitmentPage';

function App() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white selection:bg-primary/30 selection:text-white font-sans relative flex flex-col">
      {/* Premium Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015] mix-blend-screen" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
      
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
