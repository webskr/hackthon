import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-brand" style={{ color: 'white', marginBottom: '1rem' }}>
              <Zap fill="var(--primary-orange)" color="var(--primary-orange)" />
              TECHNOVA 2026
            </div>
            <p style={{ fontWeight: 600 }}>Government Polytechnic Barh, Bihar</p>
            <p style={{ color: '#aaa' }}>Organised by GP Barh IT Club</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-yellow)' }}>Quick Navigation</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#about">About</a></li>
              <li><a href="#competitions">Competitions</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#domains">Domains</a></li>
              <li><a href="#process">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-yellow)' }}>Administration & Contact</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#">Admin Portal</a></li>
              <li><a href="mailto:gpbhackathon@gmail.com">gpbhackathon@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 TECHNOVA 2026. Government Polytechnic Barh, Bihar. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>Powered by GP Barh IT Club</p>
        </div>
      </div>
    </footer>
  );
}
