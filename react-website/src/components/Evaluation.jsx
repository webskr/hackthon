import React from 'react';

export default function Evaluation() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">EVALUATION PROCESS</h2>
        <p className="section-subtitle">Clear, transparent and comprehensive scoring.</p>
        <div className="grid-4">
          <div className="neo-card step-card text-center" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary-orange)', lineHeight: 1 }}>20%</div>
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Idea Screening & Project Understanding</h3>
          </div>
          <div className="neo-card step-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--secondary-teal)', lineHeight: 1 }}>25%</div>
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Code Assessment & Architecture</h3>
          </div>
          <div className="neo-card step-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--accent-yellow)', lineHeight: 1 }}>25%</div>
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Prototype Progress Check</h3>
          </div>
          <div className="neo-card step-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--status-red)', lineHeight: 1 }}>30%</div>
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Grand Finale & Live Demonstration</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
