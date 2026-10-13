import React from 'react';
import { Link } from 'react-router-dom';
import { usePortalSettings } from '../context/SettingsContext';

export default function FinalCTA() {
  const { registrationOpen, pptSubmissionOpen } = usePortalSettings();

  return (
    <section className="section-padding text-center" style={{ textAlign: 'center' }}>
      <div className="container">
        <h2 className="section-title">READY TO IGNITE YOUR IDEAS?</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
          Form your team, explore the challenge domains and showcase your innovation at Government Polytechnic Arwal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {registrationOpen && (
            <Link to="/register" className="neo-btn" style={{ background: 'var(--secondary-teal)', color: 'white' }}>
              REGISTER YOUR TEAM ↗
            </Link>
          )}
          {pptSubmissionOpen && (
            <Link to="/submit-project" className="neo-btn neo-btn-primary">
              SUBMIT PPT / PROTOTYPE ↗
            </Link>
          )}
          <a href="/#domains" className="neo-btn neo-btn-outline">VIEW DOMAINS →</a>
        </div>
        <div style={{ marginTop: '2rem' }}>
          {pptSubmissionOpen ? (
            <span className="neo-badge teal" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              PPT & PROTOTYPE SUBMISSION OPEN (TILL 13 OCT 11:59 PM)
            </span>
          ) : (
            <span className="neo-badge red" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              PPT & PROTOTYPE SUBMISSION CLOSED
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

