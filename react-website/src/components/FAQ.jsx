import React, { useState } from 'react';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const faqs = [
    { q: 'Who is eligible to participate?', a: 'Bonafide Diploma, Polytechnic, B.Tech and BCA/MCA students.' },
    { q: 'What is the required team size?', a: 'Teams must consist of 2 to 6 members.' },
    { q: 'Is there any registration fee?', a: 'No, registration is completely free.' },
    { q: 'Can we work on an already completed project?', a: 'No completely finished production-ready projects are allowed.' },
    { q: 'Are AI tools like ChatGPT or GitHub Copilot allowed?', a: 'Yes, but participants must understand and explain their code to the judges.' },
    { q: 'Will internet and hardware resources be provided?', a: 'Participants should bring their own laptops and chargers, internet may be provided but keep a backup.' },
    { q: 'What are the important dates?', a: 'Registration closes on 10 October 2026 (11:59 PM), and the finale is on 14-15 October 2026.' },
    { q: 'How can I contact the coordinators?', a: 'You can use the contact numbers or email listed in the contact section below.' }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="section-subtitle">Find quick answers about eligibility, registration, rules, tools, schedule and logistics.</p>
        <div style={{ maxWidth: '800px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleFaq(idx)}>
                {faq.q}
                <span>{openFaq === idx ? '−' : '+'}</span>
              </div>
              <div className={`accordion-content ${openFaq === idx ? 'open' : ''}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
