import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      // Query the 'admin' collection for matching email & password
      const q = query(
        collection(db, "admin"), 
        where("email", "==", email), 
        where("password", "==", password)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setIsAuthenticated(true);
        fetchRegistrations();
      } else {
        setLoginError('Invalid Admin Credentials. Make sure you created the admin document in Firebase.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Error connecting to Firebase. Check your configuration and security rules.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchRegistrations = async () => {
    setLoadingRegs(true);
    try {
      const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setRegistrations(data);
    } catch (err) {
      console.error("Error fetching registrations: ", err);
      // Fallback if index is missing or rules block
      try {
        const fallbackQ = query(collection(db, "registrations"));
        const fbSnapshot = await getDocs(fallbackQ);
        const data = [];
        fbSnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setRegistrations(data);
      } catch (fallbackErr) {
        console.error(fallbackErr);
      }
    } finally {
      setLoadingRegs(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <div className="neo-card" style={{ maxWidth: '400px', width: '100%', background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Lock fill="var(--status-red)" color="var(--status-red)" size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 className="section-title">ADMIN PANEL</h2>
            <p className="section-subtitle">Login to access registrations</p>
          </div>
          
          {loginError && (
            <div style={{ background: 'var(--status-red)', color: 'white', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              required 
              type="email" 
              placeholder="Admin Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="neo-input" 
            />
            <input 
              required 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="neo-input" 
            />
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="neo-btn neo-btn-primary" 
              style={{ marginTop: '1rem', width: '100%' }}
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>
          </form>
          <button onClick={() => navigate('/')} className="neo-btn neo-btn-outline" style={{ width: '100%', marginTop: '1rem' }}>
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users color="var(--primary-orange)" size={32} />
            ADMIN DASHBOARD
          </h1>
          <button onClick={() => setIsAuthenticated(false)} className="neo-btn neo-btn-outline">
            LOGOUT
          </button>
        </div>

        <div className="neo-card" style={{ background: 'var(--white)', overflowX: 'auto' }}>
          {loadingRegs ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>Loading Registrations...</h3>
            </div>
          ) : registrations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No Registrations Found</h3>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--secondary-teal)', color: 'white' }}>
                  <th style={thStyle}>Team Name</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Leader Name</th>
                  <th style={thStyle}>Leader Roll No.</th>
                  <th style={thStyle}>Other Members (Name & Roll)</th>
                  <th style={thStyle}>College Name</th>
                  <th style={thStyle}>Semester</th>
                  <th style={thStyle}>Branch</th>
                  <th style={thStyle}>WhatsApp</th>
                  <th style={thStyle}>Email ID</th>
                  <th style={thStyle}>Project Title</th>
                  <th style={thStyle}>Project Description</th>
                  <th style={thStyle}>Domain</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, i) => (
                  <tr key={reg.id} style={{ borderBottom: '2px solid var(--border-color)', background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                    <td style={tdStyle}><strong>{reg.teamName}</strong></td>
                    <td style={tdStyle}>{reg.numMembers}</td>
                    <td style={tdStyle}>{reg.leaderName}</td>
                    <td style={tdStyle}>{reg.leaderRoll}</td>
                    <td style={tdStyle}>
                      {Array.isArray(reg.members) && reg.members.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {reg.members.map((m, mIdx) => (
                            <div key={mIdx} style={{ fontSize: '0.85rem' }}>
                              <strong>{m.name || `Member ${mIdx + 2}`}</strong> {m.roll ? `(${m.roll})` : ''}
                            </div>
                          ))}
                        </div>
                      ) : (
                        (reg.memberNames || []).filter(n => n && n.trim() !== '').join(', ') || '-'
                      )}
                    </td>
                    <td style={tdStyle}>{reg.collegeName}</td>
                    <td style={tdStyle}>{reg.semester}</td>
                    <td style={tdStyle}>{reg.branch}</td>
                    <td style={tdStyle}>{reg.whatsappNumber}</td>
                    <td style={tdStyle}>{reg.email}</td>
                    <td style={tdStyle}><strong>{reg.projectTitle}</strong></td>
                    <td style={{ ...tdStyle, maxWidth: '280px', whiteSpace: 'normal', fontSize: '0.85rem', lineHeight: '1.4' }}>
                      {reg.projectDescription || '-'}
                    </td>
                    <td style={tdStyle}>{reg.domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '1rem',
  borderBottom: '3px solid var(--border-color)',
  fontWeight: 800,
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '1rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};
