import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        Government Polytechnic Barh, Bihar • Organised by GP Barh IT Club • Registration Status: CLOSED
      </div>
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Zap fill="var(--primary-orange)" color="var(--primary-orange)" />
            TECHNOVA 2026
            <span className="label">HACKATHON</span>
          </div>
          <div className="nav-links">
            <a href="#competitions">Competitions</a>
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#domains">Domains</a>
            <a href="#process">How It Works</a>
            <button className="neo-btn neo-btn-primary" style={{ padding: '0.5rem 1rem' }}>
              REGISTER NOW ↗
            </button>
          </div>
          <button 
            className="mobile-menu-btn" 
            style={{ display: 'none' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </>
  );
}
