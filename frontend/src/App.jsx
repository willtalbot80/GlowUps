// App.jsx — Two-view SPA using local state for navigation (no router needed)
import React, { useState } from 'react';
import Home from './pages/Home';
import Experts from './pages/Experts';

const App = () => {
  // 'view' tracks which page is currently shown: 'home' or 'experts'
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-cream">
      {/* Top navigation bar */}
      <nav className="bg-bronze text-cream py-4 px-8 flex items-center justify-between shadow-md">
        <span
          className="text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => setView('home')}
        >
          ✨ GlowUps
        </span>
        <div className="flex gap-6">
          <button
            onClick={() => setView('home')}
            className={`font-medium hover:text-gold transition-colors ${
              view === 'home' ? 'text-gold underline' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView('experts')}
            className={`font-medium hover:text-gold transition-colors ${
              view === 'experts' ? 'text-gold underline' : ''
            }`}
          >
            Experts
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main className="p-6">
        {view === 'home' ? (
          <Home onBrowseExperts={() => setView('experts')} />
        ) : (
          <Experts onBack={() => setView('home')} />
        )}
      </main>
    </div>
  );
};

export default App;
