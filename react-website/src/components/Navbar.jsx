import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        Government Polytechnic Arwal, Bihar • Organised by GP Arwal IT Club • Registration Closes: 10 October (5:00 PM)
      </div>
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Zap fill="var(--primary-orange)" color="var(--primary-orange)" />
            INNOVEX 2026
            <span className="label">HACKATHON</span>
          </div>
          <div className="nav-links">
            <a href="/#competitions">Competitions</a>
            <a href="/#about">About</a>
            <a href="/#schedule">Schedule</a>
            <a href="/#domains">Domains</a>
            <a href="/#team">Team</a>
            <a href="/#contact">Contact</a>
            <Link to="/register" className="neo-btn neo-btn-primary" style={{ padding: '0.5rem 1rem' }}>
              REGISTER NOW ↗
            </Link>
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
