import React from 'react';
import { Trophy, Medal, Award, Sparkles, Gift } from 'lucide-react';

export default function Prizes() {
  return (
    <section id="prizes" className="section-padding" style={{ background: 'var(--text-color)', color: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span 
            className="neo-badge yellow" 
            style={{ 
              marginBottom: '1rem', 
              display: 'inline-block',
              fontSize: '0.85rem',
              padding: '0.4rem 1.2rem',
              color: 'var(--text-color)'
            }}
          >
            AWARDS & REWARDS
          </span>
          <h2 className="section-title" style={{ color: 'white' }}>PRIZES & RECOGNITION</h2>
          <p className="section-subtitle" style={{ color: '#aaa', margin: '0 auto', maxWidth: '750px' }}>
            Exciting Prize Money, Champion Trophies, Medals, Certificates and Special Recognition.
          </p>
        </div>

        <h3 style={{ color: 'var(--accent-yellow)', fontSize: '1.75rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          IDEA HACKATHON WINNERS
        </h3>

        {/* Podium Prize Cards: 1st, 2nd, 3rd Prize */}
        <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto 2.5rem auto' }}>
          {/* 2nd Prize */}
          <div 
            className="neo-card prize-card" 
            style={{ 
              background: '#1A2942', 
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.5rem 1.5rem'
            }}
          >
            <div>
              <Medal size={48} color="#C0C0C0" style={{ margin: '0 auto 1rem auto' }} />
              <h4 style={{ color: '#C0C0C0', fontSize: '1.5rem', marginBottom: '1rem' }}>2nd Prize</h4>
              <span className="neo-badge white" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                🥈 RUNNER UP
              </span>
            </div>
            <div style={{ fontWeight: 600, color: '#DDD', lineHeight: '2', fontSize: '0.95rem' }}>
              💰 <strong>Prize Money</strong><br/>
              🥈 <strong>Silver Medals for Team</strong><br/>
              📜 <strong>Winner Certificate</strong>
            </div>
          </div>

          {/* 1st Prize */}
          <div 
            className="neo-card prize-card first" 
            style={{ 
              background: 'var(--accent-yellow)', 
              color: 'var(--text-color)',
              textAlign: 'center',
              transform: 'scale(1.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '8px 8px 0px #000',
              padding: '2.5rem 1.5rem'
            }}
          >
            <div>
              <Trophy size={56} color="var(--text-color)" style={{ margin: '0 auto 1rem auto' }} />
              <span className="neo-badge red" style={{ fontSize: '0.75rem', marginBottom: '0.75rem', display: 'inline-block' }}>
                CHAMPION
              </span>
              <h4 style={{ fontSize: '1.75rem', color: 'var(--text-color)', marginBottom: '1rem' }}>1st Prize</h4>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-color)', lineHeight: '2', fontSize: '1rem' }}>
              💰 <strong>Grand Prize Money</strong><br/>
              🏆 <strong>Champion Trophy</strong><br/>
              🥇 <strong>Gold Medals for Team</strong><br/>
              📜 <strong>Winner Certificate</strong>
            </div>
          </div>

          {/* 3rd Prize */}
          <div 
            className="neo-card prize-card" 
            style={{ 
              background: '#1A2942', 
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.5rem 1.5rem'
            }}
          >
            <div>
              <Medal size={48} color="#CD7F32" style={{ margin: '0 auto 1rem auto' }} />
              <h4 style={{ color: '#CD7F32', fontSize: '1.5rem', marginBottom: '1rem' }}>3rd Prize</h4>
              <span className="neo-badge white" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                🥉 2ND RUNNER UP
              </span>
            </div>
            <div style={{ fontWeight: 600, color: '#DDD', lineHeight: '2', fontSize: '0.95rem' }}>
              💰 <strong>Prize Money</strong><br/>
              🥉 <strong>Bronze Medals for Team</strong><br/>
              📜 <strong>Winner Certificate</strong>
            </div>
          </div>
        </div>

        {/* Special Category: Best Idea Award */}
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div 
            className="neo-card" 
            style={{ 
              background: '#1A2942', 
              color: 'white', 
              borderColor: 'var(--accent-yellow)',
              textAlign: 'center',
              padding: '1.75rem 2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={24} color="var(--accent-yellow)" />
              <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-yellow)', margin: 0 }}>
                BEST IDEA INNOVATION AWARD
              </h4>
            </div>
            <p style={{ color: '#DDD', fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.8', margin: 0 }}>
              🌟 <strong>Special Recognition & Prize Money</strong> • 🎖️ <strong>Medal</strong> • 📜 <strong>Certificate of Innovation</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
