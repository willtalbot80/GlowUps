// Added by demo PR: demo/frontend-ui
// Simple two-view SPA using local state navigation (no react-router-dom)
import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Experts from './pages/Experts.jsx';

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="bg-bronze text-cream px-6 py-4 flex items-center justify-between shadow-md">
        <span className="text-xl font-bold tracking-wide text-gold">✨ GlowUps</span>
        <div className="flex gap-6">
          <button
            onClick={() => setView('home')}
            className={`font-semibold hover:text-gold transition-colors ${
              view === 'home' ? 'text-gold underline' : 'text-cream'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView('experts')}
            className={`font-semibold hover:text-gold transition-colors ${
              view === 'experts' ? 'text-gold underline' : 'text-cream'
            }`}
          >
            Experts
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main>
        {view === 'home' ? (
          <Home onNavigate={setView} />
        ) : (
          <Experts onNavigate={setView} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-beige text-bronze text-center py-4 mt-12 text-sm">
        © 2024 GlowUps — Visual Demo Only
      </footer>
    </div>
  );
};

export default App;
