import React from 'react';
import { Users, Calendar, MapPin, Zap, Award, Target, Sparkles } from 'lucide-react';

export default function Competitions() {
  return (
    <section id="competitions" className="section-padding" style={{ background: 'var(--text-color)', color: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span 
            className="neo-badge yellow" 
            style={{ 
              marginBottom: '1rem', 
              display: 'inline-block',
              fontSize: '0.85rem',
              padding: '0.4rem 1.2rem',
              color: 'var(--text-color)'
            }}
          >
            FLAGSHIP EVENT
          </span>
          <h2 className="section-title" style={{ color: 'var(--white)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            INNOVEXA 2026<br/>IDEA HACKATHON
          </h2>
          <p className="section-subtitle" style={{ color: '#bbb', margin: '0 auto', maxWidth: '750px' }}>
            The premier innovation marathon organized by GP Arwal IT Club where student thinkers collaborate to formulate disruptive solutions for real-world challenges.
          </p>
        </div>

        {/* Featured Idea Hackathon Spotlight Card */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div 
            className="neo-card comp-card" 
            style={{ 
              color: 'var(--text-color)', 
              background: 'var(--white)',
              padding: '2.5rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="neo-badge red" style={{ fontSize: '0.8rem', marginBottom: '0.5rem', display: 'inline-block' }}>
                  🔥 MAIN CHALLENGE
                </span>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
                  IDEA HACKATHON 2026
                </h3>
              </div>
              <span className="neo-badge teal" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                ⚡ 24 HOURS SPRINT
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', color: '#333' }}>
              A flagship idea incubation and prototype marathon where student innovators form teams, explore 14 problem domains, build cutting-edge solutions, and pitch directly before an esteemed jury of industry veterans and academic mentors.
            </p>

            {/* Key Information Badges */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                padding: '1.5rem',
                background: '#F9F7F1',
                border: '2px solid black',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users size={22} color="var(--primary-orange)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>TEAM SIZE</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>2–6 Members</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={22} color="var(--primary-orange)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>FINALE DATES</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>14–15 October 2026</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={22} color="var(--primary-orange)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>VENUE</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Main Auditorium, GP Arwal</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#domains" className="neo-btn neo-btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                EXPLORE 14 DOMAINS →
              </a>
              <a href="#schedule" className="neo-btn neo-btn-outline" style={{ padding: '0.85rem 1.75rem' }}>
                VIEW TIMELINE ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
