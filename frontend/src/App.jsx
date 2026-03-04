// Demo scaffold — Root App component. Implements a minimal two-view SPA
// (Home / Experts) using local state instead of react-router to keep things simple.
import React, { useState } from 'react';
import Home from './pages/Home';
import Experts from './pages/Experts';

const NAV_ITEMS = [
  { label: 'Home', view: 'home' },
  { label: 'Experts', view: 'experts' },
];

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-cream">
      {/* Header / Nav */}
      <header className="bg-bronze shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="text-2xl font-bold text-gold cursor-pointer tracking-wide"
            onClick={() => setView('home')}
          >
            ✨ GlowUps
          </span>
          <nav className="flex gap-6">
            {NAV_ITEMS.map(({ label, view: target }) => (
              <button
                key={target}
                onClick={() => setView(target)}
                className={`text-beige font-medium hover:text-gold transition ${
                  view === target ? 'text-gold underline underline-offset-4' : ''
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {view === 'home' && <Home onBrowseExperts={() => setView('experts')} />}
        {view === 'experts' && <Experts />}
      </main>

      {/* Footer */}
      <footer className="text-center text-bronze text-sm py-6 border-t border-beige">
        © 2024 GlowUps — Static Visual Demo Only
      </footer>
    </div>
  );
};

export default App;
