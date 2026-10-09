import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const targetDate = new Date('October 11, 2026 23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
              <h5 style={{ color: 'var(--text-color)' }}>REGISTRATION CLOSES: 11 OCTOBER (12:00 MIDNIGHT)</h5>
              <div className="countdown">
                <div className="countdown-block"><span>{timeLeft.days}</span><small>DAYS</small></div>
                <div className="countdown-block"><span>{timeLeft.hours}</span><small>HOURS</small></div>
                <div className="countdown-block"><span>{timeLeft.minutes}</span><small>MINS</small></div>
                <div className="countdown-block"><span>{timeLeft.seconds}</span><small>SECS</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
