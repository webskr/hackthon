import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, Train, Bus, Car } from 'lucide-react';

export default function ContactVenue() {
  const mapLink = "https://share.google/PKV3I8W52dbuRt73f";
  const embedMapUrl = "https://maps.google.com/maps?q=Government+Polytechnic+Arwal,+Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--accent-yellow)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span 
            className="neo-badge red" 
            style={{ 
              marginBottom: '0.75rem', 
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              fontSize: '0.85rem'
            }}
          >
            LOCATION & VENUE
          </span>
          <h2 className="section-title">VENUE & HOW TO REACH</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-color)', fontWeight: 600 }}>
            Find your way to Government Polytechnic Arwal for INNOVEX 2026 Grand Finale.
          </p>
        </div>

        {/* Top Venue Row: Google Map Card + Venue / Directions Cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '1.5rem',
            alignItems: 'stretch'
          }}
        >
          {/* Left: Interactive Google Map Window */}
          <div 
            className="neo-card" 
            style={{ 
              padding: '0', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              background: '#FFFFFF'
            }}
          >
            {/* Window Header */}
            <div 
              style={{ 
                background: '#FFF', 
                borderBottom: '3px solid var(--border-color)', 
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  GOOGLE MAPS • GP ARWAL CAMPUS
                </span>
              </div>
            </div>

            {/* Embedded Iframe Container with Floating Open in Maps Button */}
            <div style={{ flex: 1, minHeight: '340px', width: '100%', position: 'relative' }}>
              {/* Floating 'Open in Maps' Button */}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  background: '#FFFFFF',
                  color: '#1A73E8',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '2px solid black',
                  boxShadow: '3px 3px 0px black',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none'
                }}
              >
                Open in Maps <ExternalLink size={16} />
              </a>

              <iframe
                title="GP Arwal Location Map"
                src="https://maps.google.com/maps?q=Govt.+Polytechnic+Arwal,+Dhamaul+Panchayat,+Bihar+804419&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Map Card Footer Action */}
            <div 
              style={{ 
                padding: '0.85rem 1.25rem', 
                borderTop: '3px solid var(--border-color)', 
                background: '#FAFAFA',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                📍 Government Polytechnic Arwal, Bihar
              </span>
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-btn neo-btn-primary"
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                <Navigation size={14} /> Navigate in Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Address & How to Reach Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Address Card */}
            <div className="neo-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div 
                  style={{ 
                    background: 'var(--secondary-teal)', 
                    color: 'white', 
                    padding: '0.6rem', 
                    borderRadius: '8px', 
                    border: '2px solid black',
                    display: 'flex'
                  }}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Official Venue Address</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>INNOVEX 2026 Grand Finale</p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Government Polytechnic Arwal</h3>
              <p style={{ fontWeight: 600, color: '#333', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                Government Polytechnic Arwal Campus, Arwal, Bihar
              </p>

              {/* Schedule Banner */}
              <div 
                style={{ 
                  background: '#FFF4CC', 
                  border: '2px solid black', 
                  borderRadius: '6px', 
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <Clock size={22} color="var(--text-color)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>Hackathon Day Schedule:</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--status-red)' }}>
                    Reporting begins at 08:30 AM on 14 Oct 2026
                  </div>
                </div>
              </div>
            </div>

            {/* How to Reach Card */}
            <div 
              className="neo-card" 
              style={{ 
                padding: '1.5rem', 
                background: 'var(--secondary-teal)', 
                color: 'white' 
              }}
            >
              <h3 style={{ fontSize: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Car size={22} /> How to Reach Arwal Campus
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Train size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--accent-yellow)' }}>By Train:</strong> Nearest railway stations are Jehanabad (~35 km) and Patna Junction (~70 km). Auto-rickshaws, shared vehicles, and buses are regularly available directly to GP Arwal campus.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Bus size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--accent-yellow)' }}>By Road / Bus:</strong> Conveniently connected through state highway & bus corridors. Regular buses and cabs operate frequently from Patna, Jehanabad, and Gaya.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Assistance Strip */}
        <div 
          className="neo-card" 
          style={{ 
            marginTop: '1.5rem', 
            padding: '1.25rem 1.5rem', 
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '0.95rem' }}>
            <Phone size={20} color="var(--primary-orange)" />
            <span>NEED ROUTE ASSISTANCE ON ARRIVAL?</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:7766939312" className="neo-badge white" style={{ fontSize: '0.85rem' }}>📞 7766939312</a>
            <a href="tel:9155261246" className="neo-badge white" style={{ fontSize: '0.85rem' }}>📞 9155261246</a>
            <a href="tel:9334259841" className="neo-badge white" style={{ fontSize: '0.85rem' }}>📞 9334259841</a>
            <a href="tel:9122130140" className="neo-badge white" style={{ fontSize: '0.85rem' }}>📞 9122130140</a>
            <a href="mailto:gpahackathon@gmail.com" className="neo-badge white" style={{ fontSize: '0.85rem' }}>✉️ gpahackathon@gmail.com</a>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div style={{ marginTop: '2.5rem', maxWidth: '700px', margin: '2.5rem auto 0 auto' }}>
          <div className="neo-card" style={{ padding: '2rem', background: '#FFFFFF' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>HAVE A QUESTION OR QUERY?</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              Send us a message and our organizing team will get back to you promptly.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }} 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }} 
                />
                <input 
                  type="text" 
                  placeholder="College / Institution" 
                  style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }} 
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject / Domain Query" 
                style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }} 
              />
              <textarea 
                placeholder="Your Message..." 
                rows="3" 
                style={{ padding: '0.75rem', border: '2px solid black', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              ></textarea>
              <button 
                type="button" 
                className="neo-btn neo-btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
              >
                SUBMIT INQUIRY ↗
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
