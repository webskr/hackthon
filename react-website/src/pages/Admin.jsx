import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft, Lock, Users, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isApproving, setIsApproving] = useState(false);
  const [isUnapproving, setIsUnapproving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRegDetail, setSelectedRegDetail] = useState(null);

  // Secret moved to .env for deployment
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

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
        localStorage.setItem('adminAuth', 'true');
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

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

  const handleMarkViewed = async (reg) => {
    setSelectedRegDetail(reg);
    if (!reg.isViewed) {
      try {
        await updateDoc(doc(db, "registrations", reg.id), {
          isViewed: true
        });
        setRegistrations(prev => prev.map(r => r.id === reg.id ? { ...r, isViewed: true } : r));
      } catch (err) {
        console.error("Error updating viewed status:", err);
      }
    }
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
          isApproved: true,
          isViewed: true
        });

        // 2. Send Email via Vercel Backend Proxy (to bypass CORS)
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: [reg.email],
            subject: 'TECHNOVA 2026 Hackathon Organize By GP Arwal - Registration Approved! 🎉',
            html: `
              <h2>Congratulations ${reg.leaderName}!</h2>
              <p>Your team <strong>${reg.teamName}</strong> has been officially APPROVED for the TECHNOVA 2026 Hackathon.</p>
              <p>We are excited to see your innovation in the ${reg.domain} domain.</p>
              <br/>
              <p>If you have any query than visit our site <a href="https://gparwal.webskr.in" target="_blank" rel="noopener noreferrer">gparwal.webskr.in</a> and contact co-ordinator.</p>
              <br/>
              <p>Regards,<br/>GP Arwal</p>
            `
          })
        });

        if (!emailResponse.ok) {
          console.error("Email send failed for:", reg.email);
        }
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

  const handleUnapprove = async () => {
    if (selectedIds.size === 0) return;

    if (!window.confirm(`Are you sure you want to unapprove / move ${selectedIds.size} team(s) back to review?`)) {
      return;
    }

    setIsUnapproving(true);
    try {
      for (let id of selectedIds) {
        await updateDoc(doc(db, "registrations", id), {
          isApproved: false,
          isViewed: true
        });
      }
      alert("Selected team(s) have been unapproved and moved back to Review!");
      setSelectedIds(new Set());
      fetchRegistrations();
    } catch (error) {
      console.error("Unapprove error: ", error);
      alert("An error occurred while unapproving.");
    } finally {
      setIsUnapproving(false);
    }
  };

  const handleSingleUnapprove = async (reg) => {
    if (!window.confirm(`Move team "${reg.teamName}" back to review?`)) {
      return;
    }

    try {
      await updateDoc(doc(db, "registrations", reg.id), {
        isApproved: false,
        isViewed: true
      });
      alert(`Team "${reg.teamName}" moved back to Review!`);
      fetchRegistrations();
    } catch (error) {
      console.error("Unapprove error: ", error);
      alert("An error occurred while unapproving.");
    }
  };

  const handleDelete = async () => {
    if (selectedIds.size === 0) return;

    if (!window.confirm(`Are you sure you want to permanently delete ${selectedIds.size} user(s)?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      for (let id of selectedIds) {
        await deleteDoc(doc(db, "registrations", id));
      }
      alert("Selected users have been deleted.");
      setSelectedIds(new Set());
      fetchRegistrations();
    } catch (error) {
      console.error("Delete error: ", error);
      alert("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'Status', 'Team Name', 'Size', 'Leader Name', 'Leader Roll No.', 'Other Members', 
      'College Name', 'Semester', 'Branch', 'WhatsApp', 'Email ID', 'Project Title', 'Domain', 'Project Description'
    ];

    const csvRows = [headers.join(',')];

    registrations.forEach(reg => {
      const status = reg.isApproved ? 'APPROVED' : (reg.isViewed ? 'REVIEWED' : 'NEW');
      const otherMembers = Array.isArray(reg.members) && reg.members.length > 0 
        ? reg.members.map(m => `${m.name} (${m.roll})`).join('; ')
        : ((reg.memberNames || []).join('; '));
        
      const values = [
        status,
        `"${(reg.teamName || '').replace(/"/g, '""')}"`,
        reg.numMembers,
        `"${(reg.leaderName || '').replace(/"/g, '""')}"`,
        `"${(reg.leaderRoll || '').replace(/"/g, '""')}"`,
        `"${otherMembers.replace(/"/g, '""')}"`,
        `"${(reg.collegeName || '').replace(/"/g, '""')}"`,
        reg.semester,
        `"${(reg.branch || '').replace(/"/g, '""')}"`,
        `"${(reg.whatsappNumber || '').replace(/"/g, '""')}"`,
        `"${(reg.email || '').replace(/"/g, '""')}"`,
        `"${(reg.projectTitle || '').replace(/"/g, '""')}"`,
        `"${(reg.domain || '').replace(/"/g, '""')}"`,
        `"${(reg.projectDescription || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hackathon_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'reviewed' | 'approved' | 'all'

  const newRegistrations = registrations.filter(r => !r.isApproved && !r.isViewed);
  const reviewedRegistrations = registrations.filter(r => !r.isApproved && r.isViewed);
  const approvedRegistrations = registrations.filter(r => r.isApproved);

  const displayedRegistrations = activeTab === 'new'
    ? newRegistrations
    : activeTab === 'reviewed'
      ? reviewedRegistrations
      : activeTab === 'approved'
        ? approvedRegistrations
        : registrations;

  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '1.5rem' }}>
        <div className="neo-card" style={{ maxWidth: '440px', width: '100%', background: 'var(--white)', padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <img
                src="/gpa icon.jpg"
                alt="GP Arwal Official Logo"
                style={{
                  width: '95px',
                  height: '95px',
                  borderRadius: '50%',
                  border: '3px solid var(--border-color)',
                  boxShadow: '4px 4px 0px var(--border-color)',
                  objectFit: 'cover',
                  background: '#FFF'
                }}
              />
            </div>
            <span
              className="neo-badge red"
              style={{
                marginBottom: '0.75rem',
                display: 'inline-block',
                padding: '0.35rem 1rem',
                fontSize: '0.8rem',
                letterSpacing: '0.5px'
              }}
            >
              AUTHORIZED ACCESS
            </span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>ADMIN PANEL</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', fontSize: '0.95rem' }}>Government Polytechnic Arwal</p>
          </div>

          {loginError && (
            <div style={{ background: 'var(--status-red)', color: 'white', padding: '0.85rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, border: '2px solid black' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Admin Email</label>
              <input
                required
                type="email"
                placeholder="admin@gparwal.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Password</label>
              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                  style={{ ...inputStyle, paddingRight: '2.75rem' }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-color)',
                    userSelect: 'none',
                    zIndex: 2
                  }}
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={2.2} /> : <Eye size={20} strokeWidth={2.2} />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="neo-btn neo-btn-primary"
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', fontSize: '1rem' }}
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
            </button>
          </form>
          <button onClick={() => navigate('/')} className="neo-btn neo-btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '2rem' }}>
            <Users color="var(--primary-orange)" size={32} />
            ADMIN DASHBOARD
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleApprove}
              disabled={isApproving || selectedIds.size === 0}
              className="neo-btn"
              style={{ background: 'var(--secondary-teal)', color: 'white' }}
            >
              {isApproving ? 'APPROVING...' : `APPROVE (${selectedIds.size})`}
            </button>
            <button
              onClick={handleUnapprove}
              disabled={isUnapproving || selectedIds.size === 0}
              className="neo-btn"
              style={{ background: 'var(--primary-orange)', color: 'white' }}
              title="Move selected teams back to Reviewed"
            >
              {isUnapproving ? 'UNAPPROVING...' : `MOVE TO REVIEW (${selectedIds.size})`}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || selectedIds.size === 0}
              className="neo-btn"
              style={{ background: 'var(--status-red)', color: 'white' }}
            >
              {isDeleting ? 'DELETING...' : `DELETE (${selectedIds.size})`}
            </button>
            <button
              onClick={handleExportCSV}
              className="neo-btn"
              style={{ background: 'var(--accent-yellow)', color: 'var(--text-color)' }}
            >
              DOWNLOAD CSV
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('adminAuth');
              }}
              className="neo-btn neo-btn-outline"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Section Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('new')}
            className="neo-btn"
            style={{
              background: activeTab === 'new' ? 'var(--primary-orange)' : 'var(--white)',
              color: activeTab === 'new' ? 'white' : 'var(--text-color)',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem'
            }}
          >
            🔥 NEW / UNREVIEWED ({newRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('reviewed')}
            className="neo-btn"
            style={{
              background: activeTab === 'reviewed' ? 'var(--accent-yellow)' : 'var(--white)',
              color: 'var(--text-color)',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem'
            }}
          >
            👀 REVIEWED / SEEN ({reviewedRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className="neo-btn"
            style={{
              background: activeTab === 'approved' ? 'var(--secondary-teal)' : 'var(--white)',
              color: activeTab === 'approved' ? 'white' : 'var(--text-color)',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem'
            }}
          >
            ✅ APPROVED / VERIFIED ({approvedRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className="neo-btn"
            style={{
              background: activeTab === 'all' ? 'var(--text-color)' : 'var(--white)',
              color: activeTab === 'all' ? 'white' : 'var(--text-color)',
              padding: '0.6rem 1.1rem',
              fontSize: '0.9rem'
            }}
          >
            📋 ALL ({registrations.length})
          </button>
        </div>

        <div className="neo-card" style={{ background: 'var(--white)', overflowX: 'auto', padding: '1rem' }}>
          {loadingRegs ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>Loading Registrations...</h3>
            </div>
          ) : displayedRegistrations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>
                {activeTab === 'new'
                  ? '🎉 No New Unreviewed Registrations. All caught up!'
                  : activeTab === 'reviewed'
                    ? 'No Reviewed registrations currently.'
                    : activeTab === 'approved'
                      ? 'No Approved Registrations yet.'
                      : 'No Registrations Found'}
              </h3>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--secondary-teal)', color: 'white' }}>
                  <th style={thStyle}>Status / Select</th>
                  <th style={thStyle}>Action</th>
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
                {displayedRegistrations.map((reg, i) => (
                  <tr key={reg.id} style={{ borderBottom: '2px solid var(--border-color)', background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                    <td style={{ ...tdStyle, textAlign: 'center', minWidth: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                          checked={selectedIds.has(reg.id)}
                          onChange={() => toggleSelection(reg.id)}
                        />
                        {reg.isApproved ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#008080', fontWeight: 800, fontSize: '0.75rem', background: '#E6F4EA', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1.5px solid #008080' }}>
                            <CheckCircle size={14} color="#008080" /> APPROVED
                          </span>
                        ) : (
                          <span 
                            style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: 700, 
                              color: reg.isViewed ? '#333' : 'var(--primary-orange)', 
                              background: reg.isViewed ? '#E0E0E0' : '#FFF3E0', 
                              padding: '0.2rem 0.4rem', 
                              borderRadius: '4px' 
                            }}
                          >
                            {reg.isViewed ? 'REVIEWED' : 'NEW'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center', minWidth: '150px' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => handleMarkViewed(reg)} 
                          className="neo-btn" 
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', background: reg.isViewed ? '#F0F0F0' : 'var(--accent-yellow)', color: 'var(--text-color)' }}
                        >
                          {reg.isViewed ? 'Viewed' : 'Review ↗'}
                        </button>
                        {reg.isApproved && (
                          <button
                            onClick={() => handleSingleUnapprove(reg)}
                            className="neo-btn"
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', background: 'var(--primary-orange)', color: 'white' }}
                            title="Disapprove / Move back to review"
                          >
                            ↩ Unapprove
                          </button>
                        )}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, minWidth: '150px' }}><strong>{reg.teamName}</strong></td>
                    <td style={{ ...tdStyle, minWidth: '70px', textAlign: 'center' }}>{reg.numMembers}</td>
                    <td style={{ ...tdStyle, minWidth: '140px' }}>{reg.leaderName}</td>
                    <td style={{ ...tdStyle, minWidth: '130px' }}>{reg.leaderRoll}</td>
                    <td style={{ ...tdStyle, minWidth: '180px' }}>
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
                    <td style={{ ...tdStyle, minWidth: '160px' }}>{reg.collegeName}</td>
                    <td style={{ ...tdStyle, minWidth: '90px' }}>{reg.semester}</td>
                    <td style={{ ...tdStyle, minWidth: '110px' }}>{reg.branch}</td>
                    <td style={{ ...tdStyle, minWidth: '130px' }}>{reg.whatsappNumber}</td>
                    <td style={{ ...tdStyle, minWidth: '180px' }}>{reg.email}</td>
                    <td style={{ ...tdStyle, minWidth: '160px', maxWidth: '220px' }}><strong>{reg.projectTitle}</strong></td>
                    <td style={{ ...tdStyle, minWidth: '220px', maxWidth: '320px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                      {reg.projectDescription || '-'}
                    </td>
                    <td style={{ ...tdStyle, minWidth: '130px' }}>{reg.domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Modal for viewing detailed registration info */}
        {selectedRegDetail && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
            <div className="neo-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary-orange)' }}>TEAM: {selectedRegDetail.teamName}</h3>
                <button onClick={() => setSelectedRegDetail(null)} className="neo-btn" style={{ padding: '0.25rem 0.6rem', fontSize: '0.85rem' }}>✕ CLOSE</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <div><strong>Domain:</strong> {selectedRegDetail.domain}</div>
                <div><strong>Leader:</strong> {selectedRegDetail.leaderName} (Roll: {selectedRegDetail.leaderRoll})</div>
                <div><strong>College:</strong> {selectedRegDetail.collegeName}</div>
                <div><strong>Branch & Sem:</strong> {selectedRegDetail.branch} - Sem {selectedRegDetail.semester}</div>
                <div><strong>WhatsApp:</strong> {selectedRegDetail.whatsappNumber}</div>
                <div><strong>Email:</strong> {selectedRegDetail.email}</div>
                <div>
                  <strong>Team Members:</strong>
                  {Array.isArray(selectedRegDetail.members) && selectedRegDetail.members.length > 0 ? (
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                      {selectedRegDetail.members.map((m, idx) => (
                        <li key={idx}><strong>{m.name || `Member ${idx + 2}`}</strong> {m.roll ? `(Roll: ${m.roll})` : ''}</li>
                      ))}
                    </ul>
                  ) : (
                    <span> {(selectedRegDetail.memberNames || []).join(', ') || 'None'}</span>
                  )}
                </div>
                <div><strong>Project Title:</strong> {selectedRegDetail.projectTitle}</div>
                <div style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <strong>Project Description:</strong>
                  <p style={{ marginTop: '0.25rem', lineHeight: '1.5' }}>{selectedRegDetail.projectDescription || 'No description provided'}</p>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button onClick={() => setSelectedRegDetail(null)} className="neo-btn neo-btn-outline" style={{ padding: '0.5rem 1rem' }}>
                  DONE
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontWeight: 600 }}>Powered by <a href="https://webskr.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-orange)', textDecoration: 'none' }}>webskr.in</a></p>
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
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  verticalAlign: 'top'
};

const inputStyle = {
  padding: '0.75rem',
  border: '3px solid var(--border-color)',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  borderRadius: '4px',
  outline: 'none',
  width: '100%',
  background: '#FFFFFF',
  color: 'var(--text-color)'
};
