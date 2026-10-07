import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft, Lock, Users, CheckCircle } from 'lucide-react';
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
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isApproving, setIsApproving] = useState(false);

  // TODO: Add your Resend API Key here
  const RESEND_API_KEY = "re_7QCQPU1M_BMKSeTdg7cP5nm91vJoGzVYR";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      const q = query(
        collection(db, "admin"),
        where("email", "==", cleanEmail),
        where("password", "==", cleanPassword)
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
      querySnapshot.forEach((document) => {
        data.push({ id: document.id, ...document.data() });
      });
      setRegistrations(data);
    } catch (err) {
      console.error("Error fetching registrations: ", err);
      try {
        const fallbackQ = query(collection(db, "registrations"));
        const fbSnapshot = await getDocs(fallbackQ);
        const data = [];
        fbSnapshot.forEach((document) => {
          data.push({ id: document.id, ...document.data() });
        });
        setRegistrations(data);
      } catch (fallbackErr) {
        console.error(fallbackErr);
      }
    } finally {
      setLoadingRegs(false);
    }
  };

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleApprove = async () => {
    if (selectedIds.size === 0) return;
    if (RESEND_API_KEY === "YOUR_RESEND_API_KEY") {
      alert("Please add your Resend API Key in Admin.jsx first!");
      return;
    }

    setIsApproving(true);

    try {
      // Loop through all selected rows
      for (let id of selectedIds) {
        const reg = registrations.find(r => r.id === id);
        if (!reg || reg.isApproved) continue;

        // 1. Update Firestore
        await updateDoc(doc(db, "registrations", id), {
          isApproved: true
        });

        // 2. Send Email via Resend
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'TECHNOVA 2026 <onboarding@webskr.in>', // You should use your verified domain here
            to: [reg.email],
            subject: 'TECHNOVA 2026 Hackathon Organize By GP Arwal - Registration Approved! 🎉',
            html: `
              <h2>Congratulations ${reg.leaderName}!</h2>
              <p>Your team <strong>${reg.teamName}</strong> has been officially APPROVED for the TECHNOVA 2026 Hackathon.</p>
              <p>We are excited to see your innovation in the ${reg.domain} domain.</p>
              <br/>
              <p>If you have any query than visit our site <a href="https://gparwal.webskr.in" target="_blank" rel="noopener noreferrer">gparwal.webskr.in</a> and contact co-ordinator.
              <br/>
              <p>Regards,<br/>GP Arwal</p>
            `
          })
        });
      }

      alert("Selected teams have been approved and emails sent!");
      setSelectedIds(new Set());
      fetchRegistrations(); // Refresh table
    } catch (error) {
      console.error("Approval error: ", error);
      alert("An error occurred while approving. Note: Sending emails directly from browser using Resend might get blocked by CORS. You may need a backend proxy.");
    } finally {
      setIsApproving(false);
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
            <input required type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="neo-input" />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="neo-input" />
            <button type="submit" disabled={isLoggingIn} className="neo-btn neo-btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleApprove}
              disabled={isApproving || selectedIds.size === 0}
              className="neo-btn"
              style={{ background: 'var(--status-red)', color: 'white' }}
            >
              {isApproving ? 'APPROVING...' : `APPROVE SELECTED (${selectedIds.size})`}
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="neo-btn neo-btn-outline">
              LOGOUT
            </button>
          </div>
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
                  <th style={thStyle}>Approve</th>
                  <th style={thStyle}>Team Name</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Leader Name</th>
                  <th style={thStyle}>Leader Roll No.</th>
                  <th style={thStyle}>Other Members</th>
                  <th style={thStyle}>College Name</th>
                  <th style={thStyle}>Semester</th>
                  <th style={thStyle}>Branch</th>
                  <th style={thStyle}>WhatsApp</th>
                  <th style={thStyle}>Email ID</th>
                  <th style={thStyle}>Project Title</th>
                  <th style={thStyle}>Domain</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, i) => (
                  <tr key={reg.id} style={{ borderBottom: '2px solid var(--border-color)', background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      {reg.isApproved ? (
                        <CheckCircle color="green" size={24} />
                      ) : (
                        <input
                          type="checkbox"
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                          checked={selectedIds.has(reg.id)}
                          onChange={() => toggleSelection(reg.id)}
                        />
                      )}
                    </td>
                    <td style={tdStyle}><strong>{reg.teamName}</strong></td>
                    <td style={tdStyle}>{reg.numMembers}</td>
                    <td style={tdStyle}>{reg.leaderName}</td>
                    <td style={tdStyle}>{reg.leaderRoll}</td>
                    <td style={tdStyle}>{(reg.memberNames || []).filter(n => n.trim() !== '').join(', ') || '-'}</td>
                    <td style={tdStyle}>{reg.collegeName}</td>
                    <td style={tdStyle}>{reg.semester}</td>
                    <td style={tdStyle}>{reg.branch}</td>
                    <td style={tdStyle}>{reg.whatsappNumber}</td>
                    <td style={tdStyle}>{reg.email}</td>
                    <td style={tdStyle}>{reg.projectTitle}</td>
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
