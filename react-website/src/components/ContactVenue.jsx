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
}
