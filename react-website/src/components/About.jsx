import React from 'react';

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 className="section-title">ABOUT INNOVEX 2026</h2>
        <p className="section-subtitle">Igniting Technological Innovation in Bihar</p>
        <div style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '4rem', fontWeight: 500 }}>
          <p style={{ marginBottom: '1rem' }}>INNOVEX 2026 is the flagship Idea Hackathon presented by the GP Arwal IT Club at Government Polytechnic Arwal, Bihar.</p>
          <p>The mission is to empower student innovators, developers and visionaries to tackle societal and technological challenges through collaborative problem-solving, rapid prototyping and technical mentoring.</p>
        </div>
        <div className="grid-3">
          <div className="neo-card">
            <h3 style={{ color: 'var(--primary-orange)' }}>GP Arwal IT Club</h3>
            <p>Student-led technology community focused on peer learning, hackathons, open-source initiatives and real-world technology incubation.</p>
          </div>
          <div className="neo-card">
            <h3 style={{ color: 'var(--secondary-teal)' }}>Grassroots Impact</h3>
            <p>Technology-driven solutions across agriculture, civic governance, healthcare, education and other local challenges.</p>
          </div>
          <div className="neo-card">
            <h3 style={{ color: 'var(--status-red)' }}>Rigorous & Fair</h3>
            <p>Transparent multi-stage evaluation involving technical review, prototype assessment and live jury demonstration.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
