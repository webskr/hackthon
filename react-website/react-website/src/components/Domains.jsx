import React from 'react';

export default function Domains() {
  const domains = [
    "AI & Machine Learning", "Student Welfare", "Open Innovation", "Bihar Tourism / Heritage",
    "Cyber Security", "Agriculture", "Smart Transportation & Mobility", "Social Services / Civic Tech",
    "Medical & Health", "E-Commerce", "Climate & Environment", "Logistics & Supply Chain",
    "Smart Education & EdTech", "Smart City & Urban Solutions"
  ];
  return (
    <section id="domains" className="section-padding" style={{ background: 'var(--bg-color)' }}>
      <div className="container">
        <h2 className="section-title">14 CHALLENGE DOMAINS</h2>
        <p className="section-subtitle">Explore the areas where you can build game-changing solutions.</p>
        <div className="grid-4" style={{ marginTop: '2rem' }}>
          {domains.map(domain => (
            <div key={domain} className="domain-card">{domain}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
