const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

const files = {
  'components/Navbar.jsx': `
import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        Government Polytechnic Barh, Bihar • Organised by GP Barh IT Club • Registration Status: CLOSED
      </div>
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Zap fill="var(--primary-orange)" color="var(--primary-orange)" />
            TECHNOVA 2026
            <span className="label">HACKATHON</span>
          </div>
          <div className="nav-links">
            <a href="#competitions">Competitions</a>
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#domains">Domains</a>
            <a href="#process">How It Works</a>
            <button className="neo-btn neo-btn-primary" style={{ padding: '0.5rem 1rem' }}>
              REGISTER NOW ↗
            </button>
          </div>
          <button 
            className="mobile-menu-btn" 
            style={{ display: 'none' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </>
  );
}`,

  'components/Hero.jsx': `
import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-badges">
            <span className="neo-badge white">📍 GOVERNMENT POLYTECHNIC BARH, BIHAR</span>
            <span className="neo-badge white">⚡ ORGANISED BY GP BARH IT CLUB</span>
            <span className="neo-badge red">🔥 LIVE</span>
          </div>
          <h1 className="hero-title">TECHNOVA</h1>
          <h2 className="hero-subtitle">— HACKATHON 2026 —</h2>
          <p className="hero-desc">
            Join the biggest innovation festival at Government Polytechnic Barh. 
            Bring your ideas, build game-changing prototypes, solve real-world problems, 
            and compete for exciting prizes and mentorship.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#competitions" className="neo-btn neo-btn-primary">
              EXPLORE COMPETITIONS <ArrowDownRight size={20} />
            </a>
            <a href="#domains" className="neo-btn neo-btn-outline">
              EXPLORE 14 DOMAINS <ArrowRight size={20} />
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="neo-card hero-card">
            <h3 style={{ fontSize: '2rem' }}>15 OCTOBER — 16 OCTOBER 2026</h3>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>2 DAYS PROGRAM</h4>
            <div style={{ background: 'var(--text-color)', color: 'var(--accent-yellow)', padding: '1rem', border: '2px solid #000', borderRadius: '4px', marginBottom: '1rem' }}>
              <h5 style={{ margin: 0, fontSize: '1.25rem' }}>ACCOMMODATION WILL BE PROVIDED</h5>
            </div>
            <p style={{ fontWeight: 600 }}>
              Without fooding facility. If you want fooding, a minimal charge of ₹30–₹40 will be charged per meal.
            </p>
            <div style={{ marginTop: '3rem', borderTop: '2px solid rgba(0,0,0,0.2)', paddingTop: '1.5rem' }}>
              <h5 style={{ color: 'var(--text-color)' }}>REGISTRATION CLOSED</h5>
              <div className="countdown">
                <div className="countdown-block"><span>00</span><small>DAYS</small></div>
                <div className="countdown-block"><span>00</span><small>HOURS</small></div>
                <div className="countdown-block"><span>00</span><small>MINS</small></div>
                <div className="countdown-block"><span>00</span><small>SECS</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'components/Competitions.jsx': `
import React from 'react';
import { Users, Calendar, MapPin, Code } from 'lucide-react';

export default function Competitions() {
  return (
    <section id="competitions" className="section-padding" style={{ background: 'var(--text-color)', color: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title">TECHNOVA 2026<br/>COMPETITIONS</h2>
        <p className="section-subtitle" style={{ color: '#aaa' }}>Explore the featured competitive events organized by GP Barh IT Club.</p>
        <div className="grid-4">
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <span className="neo-badge yellow">FLAGSHIP</span>
              <h3>IDEA HACKATHON</h3>
              <p>The premier innovation marathon where student thinkers collaborate to formulate disruptive solutions...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Main Auditorium, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>CODING COMPETITION</h3>
              <p>A competitive coding challenge designed to test programming skills, problem-solving ability...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Code size={18}/> 1–2 / 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>ROBO CAR OBSTACLE CHALLENGE</h3>
              <p>A robotics arena where custom-built robotic cars navigate challenging physical obstacles...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Robotics Arena, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
          <div className="neo-card comp-card" style={{ color: 'var(--text-color)' }}>
            <div>
              <h3>ROBO WAR</h3>
              <p>An intense robotics battle arena where engineered combat robots fight for dominance...</p>
            </div>
            <div className="info">
              <span style={{ display: 'flex', gap: '0.5rem' }}><Users size={18}/> 2–4 Members</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><Calendar size={18}/> 15 October 2026</span>
              <span style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18}/> Robotics Arena, GP Barh</span>
            </div>
            <button className="neo-btn neo-btn-outline" style={{ width: '100%' }}>VIEW DETAILS →</button>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'components/About.jsx': `
import React from 'react';

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 className="section-title">ABOUT TECHNOVA 2026</h2>
        <p className="section-subtitle">Igniting Technological Innovation in Bihar</p>
        <div style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '4rem', fontWeight: 500 }}>
          <p style={{ marginBottom: '1rem' }}>TECHNOVA 2026 is the flagship Idea Hackathon presented by the GP Barh IT Club at Government Polytechnic Barh, Bihar.</p>
          <p>The mission is to empower student innovators, developers and visionaries to tackle societal and technological challenges through collaborative problem-solving, rapid prototyping and technical mentoring.</p>
        </div>
        <div className="grid-3">
          <div className="neo-card">
            <h3 style={{ color: 'var(--primary-orange)' }}>GP Barh IT Club</h3>
            <p>Student-led technology community focused on peer learning, hackathons, open-source initiatives and real-world technology incubation.</p>
          </div>
          <div className="neo-card">
            <h3 style={{ color: 'var(--secondary-teal)' }}>Grassroots Impact</h3>
            <p>Technology-driven solutions across agriculture, civic governance, healthcare, education and other local challenges.</p>
          </div>
          <div className="neo-card">
            <h3 style={{ color: 'var(--status-red)' }}>Rigorous & Fair</h3>
            <p>Transparent multi-stage evaluation involving technical review, prototype assessment and live jury demonstration.</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'components/Schedule.jsx': `
import React from 'react';

export default function Schedule() {
  return (
    <section id="schedule" className="section-padding" style={{ background: 'var(--secondary-teal)', color: 'white' }}>
      <div className="container">
        <h2 className="section-title">HACKATHON JOURNEY</h2>
        <p className="section-subtitle" style={{ color: '#eee' }}>Mark your calendar for every important milestone of TECHNOVA 2026.</p>
        <div className="grid-4">
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge teal" style={{ marginBottom: '1rem' }}>1 Oct 2026</span>
            <h3>Registration & Idea Submission</h3>
            <p>Official portal opens and teams submit their initial problem statement and proposal.</p>
            <div className="step-number">01</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge red" style={{ marginBottom: '1rem' }}>7 Oct 2026 - EXTENDED</span>
            <h3>Registration Deadline</h3>
            <p>Final deadline for team registration and idea submission.</p>
            <div className="step-number">02</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)' }}>
            <span className="neo-badge yellow" style={{ marginBottom: '1rem' }}>6–7 Oct 2026</span>
            <h3>Idea Shortlisting</h3>
            <p>Technical committee and faculty jury review submissions.</p>
            <div className="step-number">03</div>
          </div>
          <div className="neo-card step-card" style={{ color: 'var(--text-color)', background: 'var(--accent-yellow)' }}>
            <span className="neo-badge white" style={{ marginBottom: '1rem' }}>15–16 Oct 2026</span>
            <h3>Grand Finale</h3>
            <p>On-campus grand finale at Government Polytechnic Barh with live evaluations.</p>
            <div className="step-number">04</div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'components/Eligibility.jsx': `
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
}`,

  'components/Domains.jsx': `
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
}`,

  'components/HowItWorks.jsx': `
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
}`,

  'components/Evaluation.jsx': `
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
}`,

  'components/Rules.jsx': `
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
              <div className={\`accordion-content \${openRule === idx ? 'open' : ''}\`}>
                {rule.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'components/Prizes.jsx': `
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
}`,

  'components/Team.jsx': `
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
}`,

  'components/FAQ.jsx': `
import React, { useState } from 'react';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const faqs = [
    { q: 'Who is eligible to participate?', a: 'Bonafide Diploma, Polytechnic, B.Tech and BCA/MCA students.' },
    { q: 'What is the required team size?', a: 'Teams must consist of 2 to 4 members.' },
    { q: 'Is there any registration fee?', a: 'No, registration is completely free.' },
    { q: 'Can we work on an already completed project?', a: 'No completely finished production-ready projects are allowed.' },
    { q: 'Are AI tools like ChatGPT or GitHub Copilot allowed?', a: 'Yes, but participants must understand and explain their code to the judges.' },
    { q: 'Will internet and hardware resources be provided?', a: 'Participants should bring their own laptops and chargers, internet may be provided but keep a backup.' },
    { q: 'What are the important dates?', a: 'Registration closes on 7 October 2026, and the finale is on 15-16 October.' },
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
              <div className={\`accordion-content \${openFaq === idx ? 'open' : ''}\`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'components/ContactVenue.jsx': `
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactVenue() {
  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--accent-yellow)' }}>
      <div className="container">
        <h2 className="section-title">CONTACT & VENUE</h2>
        <div className="grid-3" style={{ marginTop: '3rem' }}>
          <div className="neo-card">
            <MapPin size={32} color="var(--primary-orange)" style={{ marginBottom: '1rem' }} />
            <h3>Government Polytechnic Barh</h3>
            <p style={{ fontWeight: 600, marginBottom: '2rem' }}>
              Government Polytechnic Barh Campus, NH-31, Barh, Patna, Bihar — 803213
            </p>
            <div style={{ padding: '1rem', background: 'var(--bg-color)', border: '2px solid black', borderRadius: '4px' }}>
              <h4 style={{ margin: 0 }}>TECHNOVA 2026 Grand Finale</h4>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--status-red)' }}>Reporting begins at 08:30 AM on 15 October 2026</p>
            </div>
          </div>
          <div className="neo-card">
            <h3 style={{ marginBottom: '1rem' }}>HOW TO REACH GP BARH</h3>
            <div style={{ background: '#eee', height: '150px', border: '2px solid black', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              Interactive Map Placeholder
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
              <li>📍 Barh Railway Station — ~7 km</li>
              <li>📍 Bakhtiyarpur Junction — ~22 km</li>
              <li>📍 Mokama — ~35 km</li>
              <li>📍 Begusarai — ~60 km</li>
              <li>📍 Patna Junction — ~65 km</li>
            </ul>
          </div>
          <div className="neo-card">
            <h3 style={{ marginBottom: '1rem' }}>INQUIRY</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span className="neo-badge white"><Phone size={14}/> 9279752618</span>
              <span className="neo-badge white"><Phone size={14}/> 9546337791</span>
              <span className="neo-badge white"><Phone size={14}/> 9798702106</span>
              <span className="neo-badge white"><Mail size={14}/> gpbhackathon@gmail.com</span>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }} />
              <input type="email" placeholder="Email Address" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }} />
              <input type="text" placeholder="Phone Number" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }} />
              <input type="text" placeholder="College / Institution" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }} />
              <input type="text" placeholder="Subject / Domain Query" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }} />
              <textarea placeholder="Message" rows="3" style={{ padding: '0.75rem', border: '2px solid black', fontFamily: 'var(--font-body)' }}></textarea>
              <button type="button" className="neo-btn neo-btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'components/FinalCTA.jsx': `
import React from 'react';

export default function FinalCTA() {
  return (
    <section className="section-padding text-center" style={{ textAlign: 'center' }}>
      <div className="container">
        <h2 className="section-title">READY TO IGNITE YOUR IDEAS?</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
          Form your team, explore the challenge domains and showcase your innovation at Government Polytechnic Barh.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#competitions" className="neo-btn neo-btn-primary">EXPLORE COMPETITIONS →</a>
          <a href="#domains" className="neo-btn neo-btn-outline">VIEW DOMAINS →</a>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <span className="neo-badge red" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>REGISTRATION IS CLOSED</span>
        </div>
      </div>
    </section>
  );
}`,

  'components/Footer.jsx': `
import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-brand" style={{ color: 'white', marginBottom: '1rem' }}>
              <Zap fill="var(--primary-orange)" color="var(--primary-orange)" />
              TECHNOVA 2026
            </div>
            <p style={{ fontWeight: 600 }}>Government Polytechnic Barh, Bihar</p>
            <p style={{ color: '#aaa' }}>Organised by GP Barh IT Club</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-yellow)' }}>Quick Navigation</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#about">About</a></li>
              <li><a href="#competitions">Competitions</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#domains">Domains</a></li>
              <li><a href="#process">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-yellow)' }}>Administration & Contact</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#">Admin Portal</a></li>
              <li><a href="mailto:gpbhackathon@gmail.com">gpbhackathon@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 TECHNOVA 2026. Government Polytechnic Barh, Bihar. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>Powered by GP Barh IT Club</p>
        </div>
      </div>
    </footer>
  );
}`,

  'pages/Home.jsx': `
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Competitions from '../components/Competitions';
import About from '../components/About';
import Schedule from '../components/Schedule';
import Eligibility from '../components/Eligibility';
import Domains from '../components/Domains';
import HowItWorks from '../components/HowItWorks';
import Evaluation from '../components/Evaluation';
import Rules from '../components/Rules';
import Prizes from '../components/Prizes';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import ContactVenue from '../components/ContactVenue';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Competitions />
      <About />
      <Schedule />
      <Eligibility />
      <Domains />
      <HowItWorks />
      <Evaluation />
      <Rules />
      <Prizes />
      <Team />
      <FAQ />
      <ContactVenue />
      <FinalCTA />
      <Footer />
    </>
  );
}`,

  'App.jsx': `
import React from 'react';
import Home from './pages/Home';
import './index.css';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Home />
    </div>
  );
}`
};

for (const [relativePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, relativePath), content.trim() + '\\n');
}
console.log('Successfully created all components and pages!');
