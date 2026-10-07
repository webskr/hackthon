import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-badges">
            <span className="neo-badge white">📍 GOVERNMENT POLYTECHNIC BARH, BIHAR</span>
            <span className="neo-badge white">⚡ ORGANISED BY GP BARH IT CLUB</span>
            <span className="neo-badge red">🔥 LIVE</span>
          </div>
          <h1 className="hero-title">TECHNOVA</h1>
          <h2 className="hero-subtitle">— HACKATHON 2026 —</h2>
          <p className="hero-desc">
            Join the biggest innovation festival at Government Polytechnic Barh. 
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
            <h3 style={{ fontSize: '2rem' }}>15 OCTOBER — 16 OCTOBER 2026</h3>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>2 DAYS PROGRAM</h4>
            <div style={{ background: 'var(--text-color)', color: 'var(--accent-yellow)', padding: '1rem', border: '2px solid #000', borderRadius: '4px', marginBottom: '1rem' }}>
              <h5 style={{ margin: 0, fontSize: '1.25rem' }}>ACCOMMODATION WILL BE PROVIDED</h5>
            </div>
            <p style={{ fontWeight: 600 }}>
              Without fooding facility. If you want fooding, a minimal charge of ₹30–₹40 will be charged per meal.
            </p>
            <div style={{ marginTop: '3rem', borderTop: '2px solid rgba(0,0,0,0.2)', paddingTop: '1.5rem' }}>
              <h5 style={{ color: 'var(--white)' }}>REGISTRATION IS OPEN</h5>
              <div className="countdown">
                <div className="countdown-block"><span>12</span><small>DAYS</small></div>
                <div className="countdown-block"><span>08</span><small>HOURS</small></div>
                <div className="countdown-block"><span>45</span><small>MINS</small></div>
                <div className="countdown-block"><span>30</span><small>SECS</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
