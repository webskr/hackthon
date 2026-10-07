import React from 'react';
import { Users, CheckCircle, Smartphone, Award } from 'lucide-react';

export default function Eligibility() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">WHO CAN PARTICIPATE?</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div className="neo-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users color="var(--primary-orange)" /> <strong>2–4 Members</strong>
          </div>
          <div className="neo-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle color="var(--primary-orange)" /> <strong>Diploma / B.Tech / BCA / MCA Students</strong>
          </div>
          <div className="neo-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Smartphone color="var(--primary-orange)" /> <strong>Valid College ID Required</strong>
          </div>
          <div className="neo-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Award color="var(--primary-orange)" /> <strong>Free Registration</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
