import React, { useState } from 'react';

export default function Rules() {
  const [openRule, setOpenRule] = useState(null);
  const toggleRule = (index) => setOpenRule(openRule === index ? null : index);
  const rules = [
    { q: 'Team & Eligibility', a: 'Teams must have 2–4 members.' },
    { q: 'College ID Verification', a: 'Participants must carry valid institutional identification.' },
    { q: 'Original Work', a: 'Plagiarism and copied projects are prohibited.' },
    { q: 'Pre-Hackathon Prototype Policy', a: 'No completely finished production-ready projects.' },
    { q: 'AI Tools', a: 'AI coding assistants such as ChatGPT and Copilot are allowed, but participants must understand and explain their code.' },
    { q: 'Individual Contribution', a: 'Every team member must actively contribute.' },
    { q: 'Equipment', a: 'Participants should bring their own laptops, chargers and required hardware.' },
    { q: 'Final Authority', a: 'Evaluation committee and judges have final decision authority.' },
    { q: 'Professional Conduct', a: 'Participants must follow campus discipline and safety requirements.' }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title">RULES & GUIDELINES</h2>
        <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
          {rules.map((rule, idx) => (
            <div key={idx} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleRule(idx)}>
                {rule.q}
                <span>{openRule === idx ? '−' : '+'}</span>
              </div>
              <div className={`accordion-content ${openRule === idx ? 'open' : ''}`}>
                {rule.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
