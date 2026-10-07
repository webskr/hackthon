import React from 'react';

export default function Team() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">LEADERSHIP & COORDINATORS</h2>
        <p className="section-subtitle">Faculty mentors and GP Barh IT Club student coordinators behind TECHNOVA 2026.</p>
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          <div className="neo-card text-center" style={{ textAlign: 'center' }}>
            <h3>Faculty / Patron</h3>
            <p>Guiding Visionaries</p>
          </div>
          <div className="neo-card text-center" style={{ textAlign: 'center' }}>
            <h3>Student Leads</h3>
            <p>Event Directors</p>
          </div>
          <div className="neo-card text-center" style={{ textAlign: 'center' }}>
            <h3>Student Coordinators</h3>
            <p>Operations & Logistics</p>
          </div>
          <div className="neo-card text-center" style={{ textAlign: 'center' }}>
            <h3>Design Team</h3>
            <p>Creatives & Media</p>
          </div>
        </div>
        <button className="neo-btn neo-btn-outline">VIEW ALL COORDINATORS →</button>
      </div>
    </section>
  );
}
