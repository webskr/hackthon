import React from 'react';

export default function Prizes() {
  return (
    <section className="section-padding" style={{ background: 'var(--text-color)', color: 'white' }}>
      <div className="container">
        <h2 className="section-title">PRIZES & RECOGNITION</h2>
        <p className="section-subtitle" style={{ color: '#aaa' }}>Champion trophies, medals, certificates and cash prizes.</p>
        <h3 style={{ color: 'var(--accent-yellow)', fontSize: '2rem', marginBottom: '2rem' }}>IDEA HACKATHON</h3>
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          <div className="neo-card prize-card" style={{ background: '#222', color: 'white' }}>
            <h4>2nd Prize</h4>
            <h3>₹2,000</h3>
            <p>Runner-Up Trophy<br/>Silver Medal<br/>Winner Certificate</p>
          </div>
          <div className="neo-card prize-card first">
            <h4>1st Prize</h4>
            <h3>₹3,000</h3>
            <p>Champion Trophy<br/>Gold Medal<br/>Winner Certificate</p>
          </div>
          <div className="neo-card prize-card" style={{ background: '#222', color: 'white' }}>
            <h4>3rd Prize</h4>
            <h3>₹1,000</h3>
            <p>Runner-Up Trophy<br/>Bronze Medal<br/>Winner Certificate</p>
          </div>
        </div>
        <div className="grid-3">
          <div className="neo-card" style={{ background: '#222', color: 'white', borderColor: 'var(--border-color)' }}>
            <h4 style={{ color: 'var(--primary-orange)' }}>CODING COMPETITION</h4>
            <p>1st — ₹2,000<br/>2nd — ₹1,500<br/>3rd — ₹1,000</p>
          </div>
          <div className="neo-card" style={{ background: '#222', color: 'white', borderColor: 'var(--border-color)' }}>
            <h4 style={{ color: 'var(--primary-orange)' }}>ROBO CAR CHALLENGE</h4>
            <p>1st — ₹2,000<br/>2nd — ₹1,500<br/>3rd — ₹1,000</p>
          </div>
          <div className="neo-card" style={{ background: '#222', color: 'white', borderColor: 'var(--border-color)' }}>
            <h4 style={{ color: 'var(--primary-orange)' }}>ROBO WAR</h4>
            <p>1st — ₹3,000<br/>2nd — ₹2,000<br/>3rd — ₹1,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
