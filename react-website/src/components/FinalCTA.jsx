import React from 'react';

export default function FinalCTA() {
  return (
    <section className="section-padding text-center" style={{ textAlign: 'center' }}>
      <div className="container">
        <h2 className="section-title">READY TO IGNITE YOUR IDEAS?</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
          Form your team, explore the challenge domains and showcase your innovation at Government Polytechnic Barh.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#competitions" className="neo-btn neo-btn-primary">EXPLORE COMPETITIONS →</a>
          <a href="#domains" className="neo-btn neo-btn-outline">VIEW DOMAINS →</a>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <span className="neo-badge red" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>REGISTRATION IS CLOSED</span>
        </div>
      </div>
    </section>
  );
}
