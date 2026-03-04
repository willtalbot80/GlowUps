// Demo scaffold — src/App.jsx
// Root application component. Uses local state for minimal client-side routing
// (no react-router needed) to keep dependencies lean.
import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Experts from './pages/Experts.jsx';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'experts', label: 'Experts' },
];

const App = () => {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F1ED' }}>
      {/* ── Header / Nav ── */}
      <header className="shadow-md" style={{ backgroundColor: '#8B6F47' /* bronze */ }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => setPage('home')}
            className="text-2xl font-bold tracking-wide"
            style={{ color: '#D4AF37' /* gold */ }}
          >
            ✨ GlowUps
          </button>

          {/* Nav links */}
          <nav className="flex gap-6">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={[
                  'text-sm font-semibold px-3 py-1 rounded-lg transition-colors duration-150',
                  page === id
                    ? 'text-white'
                    : 'hover:opacity-80',
                ].join(' ')}
                style={
                  page === id
                    ? { backgroundColor: '#D4AF37' /* gold */ }
                    : { color: '#E8DCC8' /* beige */ }
                }
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={setPage} />}
        {page === 'experts' && <Experts />}
      </main>

      {/* ── Footer ── */}
      <footer
        className="text-center py-4 text-xs opacity-80"
        style={{ backgroundColor: '#8B6F47' /* bronze */, color: '#E8DCC8' /* beige */ }}
      >
        © {new Date().getFullYear()} GlowUps · Static demo — no backend integration
      </footer>
    </div>
  );
};

export default App;
