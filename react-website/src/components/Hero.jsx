import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-badges">
            <span className="neo-badge white">📍 GOVERNMENT POLYTECHNIC ARWAL, BIHAR</span>
            <span className="neo-badge white">⚡ ORGANISED BY GP ARWAL IT CLUB</span>
            <span className="neo-badge red">🔥 LIVE</span>
          </div>
          <h1 className="hero-title">INNOVEXA</h1>
          <h2 className="hero-subtitle">HACKATHON 2026</h2>
          <p className="hero-desc">
            Join the biggest innovation festival at Government Polytechnic Arwal. 
            Bring your ideas, build game-changing prototypes, solve real-world problems, 
            and compete for exciting prizes and mentorship.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="neo-btn neo-btn-primary">
              REGISTER NOW <ArrowDownRight size={20} />
            </Link>
            <a href="/#domains" className="neo-btn neo-btn-outline">
              EXPLORE 14 DOMAINS <ArrowRight size={20} />
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="neo-card hero-card">
            <h3 style={{ fontSize: '2rem' }}>14 OCTOBER — 15 OCTOBER 2026</h3>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>24 HOURS PROGRAM</h4>
            <div style={{ marginTop: '3rem', borderTop: '2px solid rgba(0,0,0,0.2)', paddingTop: '1.5rem' }}>
              <h5 style={{ color: 'var(--text-color)' }}>REGISTRATION CLOSES: 10 OCTOBER (05:00 PM)</h5>
              <div className="countdown">
                <div className="countdown-block"><span>10</span><small>OCTOBER</small></div>
                <div className="countdown-block"><span>05</span><small>5:00 PM</small></div>
                <div className="countdown-block"><span>00</span><small>MINS</small></div>
                <div className="countdown-block"><span>00</span><small>SECS</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
