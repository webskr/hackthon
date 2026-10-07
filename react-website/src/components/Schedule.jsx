import React from 'react';

export default function Schedule() {
  return (
    <section id="schedule" className="section-padding" style={{ background: 'var(--secondary-teal)', color: 'white' }}>
      <div className="container">
        <h2 className="section-title">HACKATHON JOURNEY</h2>
        <p className="section-subtitle" style={{ color: '#eee' }}>Mark your calendar for every important milestone of INNOVEX 2026.</p>
        <div className="grid-4">
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge teal" style={{ marginBottom: '1rem' }}>8 Oct 2026</span>
            <h3>Registration & Idea Submission</h3>
            <p>Official portal opens and teams submit their initial problem statement and proposal.</p>
            <div className="step-number">01</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge red" style={{ marginBottom: '1rem' }}>10 Oct 2026 (5:00 PM)</span>
            <h3>Registration Deadline</h3>
            <p>Final deadline for team registration and idea submission.</p>
            <div className="step-number">02</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge yellow" style={{ marginBottom: '1rem' }}>11–13 Oct 2026</span>
            <h3>Idea Shortlisting</h3>
            <p>Technical committee and faculty jury review submissions.</p>
            <div className="step-number">03</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)', background: 'var(--accent-yellow)' }}>
            <span className="neo-badge white" style={{ marginBottom: '1rem' }}>14–15 Oct 2026</span>
            <h3>Grand Finale</h3>
            <p>On-campus grand finale at Government Polytechnic Arwal with live evaluations.</p>
            <div className="step-number">04</div>
          </div>
        </div>
      </div>
    </section>
  );
}
