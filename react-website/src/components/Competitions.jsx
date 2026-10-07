import React from 'react';
import { Users, Calendar, MapPin, Code } from 'lucide-react';

export default function Competitions() {
  return (
    <section id="competitions" className="section-padding" style={{ background: 'var(--text-color)', color: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title">TECHNOVA 2026<br/>COMPETITIONS</h2>
        <p className="section-subtitle" style={{ color: '#aaa' }}>Explore the featured competitive events organized by GP Barh IT Club.</p>
        <div className="grid-4">
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <span className="neo-badge yellow">FLAGSHIP</span>
              <h3>IDEA HACKATHON</h3>
              <p>The premier innovation marathon where student thinkers collaborate to formulate disruptive solutions...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Main Auditorium, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>CODING COMPETITION</h3>
              <p>A competitive coding challenge designed to test programming skills, problem-solving ability...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Code size={18}/> 1–2 / 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>ROBO CAR OBSTACLE CHALLENGE</h3>
              <p>A robotics arena where custom-built robotic cars navigate challenging physical obstacles...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Robotics Arena, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>ROBO WAR</h3>
              <p>An intense robotics battle arena where engineered combat robots fight for dominance...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Robotics Arena, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
