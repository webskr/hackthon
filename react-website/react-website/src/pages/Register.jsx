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

  // Check if registration is closed
  const isClosed = new Date().getTime() > new Date('October 11, 2026 23:59:59').getTime();

  const [formData, setFormData] = useState({
    teamName: '',
    numMembers: '2',
    leaderName: '',
    leaderRoll: '',
    members: [{ name: '', roll: '' }], // Array of { name: '', roll: '' }
    collegeName: '',
    semester: '1',
    branch: '',
    whatsappNumber: '',
    email: '',
    projectTitle: '',
    projectDescription: '',
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
      const membersCount = num > 1 ? num - 1 : 0;
      const newMembers = [...(prev.members || [])];
      
      while (newMembers.length < membersCount) {
        newMembers.push({ name: '', roll: '' });
      }
      return { 
        ...prev, 
        numMembers: e.target.value,
        members: newMembers.slice(0, membersCount)
      };
    });
  };

  const handleMemberChange = (index, field, value) => {
    setFormData(prev => {
      const newMembers = [...(prev.members || [])];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, members: newMembers };
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
        memberNames: (formData.members || []).map(m => m.name),
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
          <p style={{ margin: '2rem 0', fontWeight: 600 }}>Your team has been successfully registered for INNOVEXA 2026. We will contact you soon via Email and WhatsApp.</p>
          <button onClick={() => navigate('/')} className="neo-btn neo-btn-primary">
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  if (isClosed) {
    return (
      <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="neo-card" style={{ background: 'var(--white)', textAlign: 'center', padding: '3rem 2rem' }}>
            <h1 style={{ color: 'var(--status-red)', marginBottom: '1rem', fontSize: '2.5rem' }}>REGISTRATION CLOSED</h1>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2rem' }}>
              We are no longer accepting new registrations for INNOVEXA 2026. Thank you for your overwhelming response!
            </p>
            <button onClick={() => navigate('/')} className="neo-btn neo-btn-primary">
              RETURN TO HOME
            </button>
          </div>
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
            <p className="section-subtitle" style={{ margin: '0 auto' }}>INNOVEXA 2026 Hackathon</p>
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
              <label style={{ fontWeight: 700 }}>2. Number of Team Members (2 - 6) *</label>
              <select required name="numMembers" value={formData.numMembers} onChange={handleNumMembersChange} style={inputStyle}>
                {[2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Members</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>3. Team Leader Name *</label>
                <input required type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>4. Leader Registration / Roll No. *</label>
                <input required type="text" name="leaderRoll" value={formData.leaderRoll} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>

            {formData.members && formData.members.map((member, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: '#f9f9f9', padding: '1.25rem', borderRadius: '4px', border: '2px solid var(--border-color)' }}>
                <h4 style={{ margin: 0, fontWeight: 800, color: 'var(--primary-orange)', fontSize: '1rem' }}>
                  Team Member {index + 2} Information
                </h4>
                <div className="form-row" style={{ gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Member {index + 2} Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder={`Full Name`}
                      value={member.name} 
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)} 
                      style={inputStyle} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Member {index + 2} Registration / Roll No. *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder={`Roll / Registration No.`}
                      value={member.roll} 
                      onChange={(e) => handleMemberChange(index, 'roll', e.target.value)} 
                      style={inputStyle} 
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Academic Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>6. College Name *</label>
              <input required type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} style={inputStyle} />
            </div>

            <div className="form-row">
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
            <div className="form-row">
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: 700 }}>12. Description of your Project *</label>
                <span style={{ fontSize: '0.85rem', color: formData.projectDescription.length >= 250 ? 'var(--status-red)' : '#666', fontWeight: 600 }}>
                  {formData.projectDescription.length} / 250 characters
                </span>
              </div>
              <textarea 
                required 
                name="projectDescription" 
                maxLength={250}
                rows={4}
                placeholder="Briefly describe your project idea, problem solved and solution (max 250 characters)..."
                value={formData.projectDescription} 
                onChange={handleInputChange} 
                style={{ ...inputStyle, resize: 'vertical' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>13. Domain / Sector *</label>
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
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.75rem', 
  border: '3px solid var(--border-color)', 
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  borderRadius: '4px',
  outline: 'none',
  transition: 'box-shadow 0.2s',
};
