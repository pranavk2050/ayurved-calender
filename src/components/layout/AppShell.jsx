import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Today', icon: '☀️' },
  { to: '/calendar', label: 'Calendar', icon: '📅' },
  { to: '/prakriti', label: 'Prakriti', icon: '🧬' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
]

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-stone-800 text-lg">
            <span>🌿</span>
            <span>Ayurvedic Calendar</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.to
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="sm:hidden border-t border-stone-200 bg-white px-4 pb-3 pt-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.to
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">{children}</main>

      <footer className="text-center text-xs text-stone-400 py-4 space-y-1">
        <p>Ayurvedic Calendar · Guided by tradition, personalised by location</p>
        <p>Created by Pranav Dnyaneshwar Kulkarni</p>
      </footer>
    </div>
  )
}
