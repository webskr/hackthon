import React from 'react';

export default function HowItWorks() {
  return (
    <section id="process" className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title">HOW IT WORKS</h2>
        <p className="section-subtitle">From initial concept proposal to the campus grand finale.</p>
        <div className="grid-4">
          <div className="neo-card" style={{ borderTop: '8px solid var(--primary-orange)' }}>
            <h3>01. Team Registration</h3>
            <p>Form a team and submit the problem statement and solution abstract.</p>
          </div>
          <div className="neo-card" style={{ borderTop: '8px solid var(--secondary-teal)' }}>
            <h3>02. Scrutiny</h3>
            <p>Experts evaluate feasibility, uniqueness and problem-solution alignment.</p>
          </div>
          <div className="neo-card" style={{ borderTop: '8px solid var(--accent-yellow)' }}>
            <h3>03. Prototype</h3>
            <p>Shortlisted teams develop functional prototypes with checkpoints and mentorship.</p>
          </div>
          <div className="neo-card" style={{ borderTop: '8px solid var(--status-red)' }}>
            <h3>04. Final Pitch</h3>
            <p>Teams demonstrate their solution, answer jury questions and compete for awards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
