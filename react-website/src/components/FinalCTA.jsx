import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="section-padding text-center" style={{ textAlign: 'center' }}>
      <div className="container">
        <h2 className="section-title">READY TO IGNITE YOUR IDEAS?</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
          Form your team, explore the challenge domains and showcase your innovation at Government Polytechnic Arwal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/submit-project" className="neo-btn neo-btn-primary">SUBMIT PPT / PROTOTYPE ↗</Link>
          <a href="/#domains" className="neo-btn neo-btn-outline">VIEW DOMAINS →</a>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <span className="neo-badge teal" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>PPT & PROTOTYPE SUBMISSION OPEN (TILL 13 OCT 11:59 PM)</span>
        </div>
      </div>
    </section>
  );
}
