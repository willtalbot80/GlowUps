import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-pepper-100 shadow-soft-lg">
      <div className="container-max px-4 flex items-center justify-between h-14">
        <Link to="/" className="font-heading text-xl font-bold text-pepper-900 tracking-tight">
          GlowUps
        </Link>
        <div className="flex gap-6 text-sm font-semibold">
          <Link
            to="/"
            className={pathname === '/' ? 'text-pepper-900 border-b-2 border-pepper-900 pb-0.5' : 'text-pepper-500 hover:text-pepper-900 transition-colors'}
          >
            Home
          </Link>
          <Link
            to="/experts"
            className={pathname === '/experts' ? 'text-pepper-900 border-b-2 border-pepper-900 pb-0.5' : 'text-pepper-500 hover:text-pepper-900 transition-colors'}
          >
            Experts
          </Link>
        </div>
      </div>
    </nav>
  );
}
