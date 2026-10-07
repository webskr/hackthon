import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft, Zap } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    teamName: '',
    numMembers: '1',
    leaderName: '',
    leaderRoll: '',
    memberNames: [''], // Array for member names
    collegeName: '',
    semester: '1',
    branch: '',
    whatsappNumber: '',
    email: '',
    projectTitle: '',
    domain: 'Agriculture'
  });

  const domains = [
    "Agriculture", "Healthcare", "Environment", "Education", "Smart City",
    "Accessibility", "Energy", "Mobility", "Industry", "Society", "Safety", "Other Sector"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumMembersChange = (e) => {
    const num = parseInt(e.target.value);
    setFormData(prev => {
      // Adjust the member names array length based on selected number
      // num includes the leader? The prompt says "Number of Team Members", let's assume it's total members.
      // So if num = 3, we need 1 leader and 2 members.
      const membersCount = num > 1 ? num - 1 : 0;
      const newMemberNames = [...prev.memberNames];
      
      while (newMemberNames.length < membersCount) {
        newMemberNames.push('');
      }
      return { 
        ...prev, 
        numMembers: e.target.value,
        memberNames: newMemberNames.slice(0, membersCount)
      };
    });
  };

  const handleMemberNameChange = (index, value) => {
    setFormData(prev => {
      const newNames = [...prev.memberNames];
      newNames[index] = value;
      return { ...prev, memberNames: newNames };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Add a new document with email as id.
      await setDoc(doc(db, "registrations", formData.email), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to register. Please check your Firebase configuration and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="neo-card text-center" style={{ maxWidth: '500px' }}>
          <h2 style={{ color: 'var(--secondary-teal)' }}>REGISTRATION SUCCESSFUL! 🎉</h2>
          <p style={{ margin: '2rem 0', fontWeight: 600 }}>Your team has been successfully registered for TECHNOVA 2026. We will contact you soon via Email and WhatsApp.</p>
          <button onClick={() => navigate('/')} className="neo-btn neo-btn-primary">
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button onClick={() => navigate('/')} className="neo-btn neo-btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={18} /> BACK TO HOME
        </button>

        <div className="neo-card" style={{ background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Zap fill="var(--primary-orange)" color="var(--primary-orange)" size={48} style={{ margin: '0 auto 1rem' }} />
            <h1 className="section-title" style={{ fontSize: '2.5rem' }}>TEAM REGISTRATION</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>TECHNOVA 2026 Hackathon</p>
          </div>

          {error && (
            <div style={{ background: 'var(--status-red)', color: 'white', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Team Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>1. Team Name *</label>
              <input required type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>2. Number of Team Members *</label>
              <select required name="numMembers" value={formData.numMembers} onChange={handleNumMembersChange} style={inputStyle}>
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>3. Team Leader Name *</label>
                <input required type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>4. Leader Registration / Roll No. *</label>
                <input required type="text" name="leaderRoll" value={formData.leaderRoll} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>

            {formData.memberNames.map((name, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f5f5f5', padding: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <label style={{ fontWeight: 700 }}>5. Team Member {index + 2} Name *</label>
                <input 
                  required 
                  type="text" 
                  value={name} 
                  onChange={(e) => handleMemberNameChange(index, e.target.value)} 
                  style={inputStyle} 
                />
              </div>
            ))}

            {/* Academic Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>6. College Name *</label>
              <input required type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>7. Semester *</label>
                <select required name="semester" value={formData.semester} onChange={handleInputChange} style={inputStyle}>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>Semester {num}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>8. Branch / Department *</label>
                <input required type="text" name="branch" value={formData.branch} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>9. Team Leader WhatsApp Number *</label>
                <input required type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>10. Email ID *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>

            {/* Project Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>11. Project Idea / Title *</label>
              <input required type="text" name="projectTitle" value={formData.projectTitle} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>12. Domain / Sector *</label>
              <select required name="domain" value={formData.domain} onChange={handleInputChange} style={inputStyle}>
                {domains.map(dom => (
                  <option key={dom} value={dom}>{dom}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="neo-btn neo-btn-primary" 
              style={{ marginTop: '2rem', padding: '1rem', width: '100%', fontSize: '1.25rem' }}
            >
              {isSubmitting ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem', 
  border: '3px solid var(--border-color)', 
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  borderRadius: '4px',
  outline: 'none',
  transition: 'box-shadow 0.2s',
};
