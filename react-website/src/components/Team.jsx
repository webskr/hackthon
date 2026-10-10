import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, GraduationCap, Award, Copy, Check } from 'lucide-react';

export default function Team() {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedPhone, setCopiedPhone] = useState(null);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => {
      setCopiedPhone(null);
    }, 2000);
  };

  const teachers = [
    {
      name: "Abhijeet kumar",
      role: "Principal",
      dept: "Patron / Principal",
      type: "PRINCIPAL",
      avatar: "/Abhijeet sir.jpg"
    },
    {
      name: "Archana Kumari",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "TEACHER",
      avatar: "/Archana.jpg"
    },
    {
      name: "Ravikant Kumar",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "TEACHER",
      avatar: "/Ravikant sir.jpg"
    },
    {
      name: "Ajeet Prasad Singh",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "HOD",
      avatar: "/ajeet sir.jpg"
    },
    {
      name: "Gaurav Kishore",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "HOD",
      avatar: "/gaurav.jpg"
    },
    {
      name: "Abhishek Pankaj",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "TEACHER",
      avatar: "/Abhishek sir.jpg"
    },
    {
      name: "Vikash kumar",
      role: "Faculty Coordinator",
      dept: "Professor",
      type: "TEACHER",
      avatar: "/vikash.jpg"
    }
  ];

  const hods = [
    {
      name: "Prof. Ajeet Prasad Singh",
      role: "HOD (EE)",
      dept: "Head of Department / EE",
      type: "HOD",
      avatar: "/ajeet sir.jpg"
    },
    {
      name: "Prof. Saket Kumar",
      role: "HOD (CSE)",
      dept: "Head of Department / CSE",
      type: "HOD",
      avatar: "/saket sir copy.jpg"
    },
    {
      name: "Prof. Gaurav Kishore",
      role: "HOD (ECE)",
      dept: "Head of Department / ECE",
      type: "HOD",
      avatar: "/gaurav.jpg"
    },
    {
      name: "Prof. Chandan Kumar",
      role: "HOD (CE)",
      dept: "Head of Department / CE",
      type: "HOD",
      avatar: "/Chandan kumar.jpg"
    },
    {
      name: "Prof. Atul Kumar",
      role: "HOD (ME)",
      dept: "Head of Department / ME",
      type: "HOD",
      avatar: "/Atul sir.jpg"
    }
  ];

  const students = [
    {
      name: "Shubham Kumar",
      role: "Student Coordinator",
      dept: "ECE / 2024",
      type: "STUDENT",
      phone: "7766939312",
      avatar: "/shubham copy.jpeg"
    },
    {
      name: "Devkrishn Kumar",
      role: "Student Coordinator",
      dept: "ECE / 2024",
      type: "STUDENT",
      phone: "8544685036",
      avatar: "/Devkrishn.jpg"
    },
    {
      name: "Balajee",
      role: "Student Coordinator",
      dept: "ECE / 2024",
      type: "STUDENT",
      phone: "9661185337",
      avatar: "/balajee.jpg"
    },
    {
      name: "Aditya Kumar",
      role: "Student Coordinator",
      dept: "CSE / 2024",
      type: "STUDENT",
      phone: "9155261246",
      avatar: "/aditya.jpg"
    },
    {
      name: "Dhiraj Kumar",
      role: "Student Coordinator",
      dept: "EE / 2024",
      type: "STUDENT",
      phone: "6207058665",
      avatar: "/dhiraj.jpg"
    },
    {
      name: "Vishal Kumar",
      role: "Student Coordinator",
      dept: "CE / 2024",
      type: "STUDENT",
      phone: "9334259841",
      avatar: "/vishal.jpg"
    },
    {
      name: "Rounak kumar",
      role: "Student Coordinator",
      dept: "ME / 2024",
      type: "STUDENT",
      phone: "9122130140",
      avatar: "/Rounak.jpg"
    }
  ];

  const allMembers = [
    ...teachers,
    ...hods,
    ...students
  ];

  const displayedMembers = 
    activeTab === 'teachers' ? teachers :
    activeTab === 'hods' ? hods :
    activeTab === 'students' ? students :
    allMembers;

  return (
    <section id="team" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span 
            className="neo-badge red" 
            style={{ 
              marginBottom: '1rem', 
              display: 'inline-block',
              letterSpacing: '1px',
              padding: '0.4rem 1.2rem',
              fontSize: '0.85rem'
            }}
          >
            ORGANIZING COMMITTEE
          </span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            LEADERSHIP & COORDINATORS
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '750px' }}>
            Meet the faculty mentors and GP Arwal IT Club student coordinators behind INNOVEXA 2026.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              className="neo-btn"
              style={{
                background: activeTab === 'all' ? 'var(--text-color)' : 'var(--white)',
                color: activeTab === 'all' ? 'var(--white)' : 'var(--text-color)',
                borderColor: 'var(--text-color)',
                padding: '0.6rem 1.4rem',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              ALL MEMBERS ({allMembers.length})
            </button>
            <button
              onClick={() => setActiveTab('hods')}
              className="neo-btn"
              style={{
                background: activeTab === 'hods' ? 'var(--text-color)' : 'var(--white)',
                color: activeTab === 'hods' ? 'var(--white)' : 'var(--text-color)',
                borderColor: 'var(--text-color)',
                padding: '0.6rem 1.4rem',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              HODs ({hods.length})
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className="neo-btn"
              style={{
                background: activeTab === 'teachers' ? 'var(--text-color)' : 'var(--white)',
                color: activeTab === 'teachers' ? 'var(--white)' : 'var(--text-color)',
                borderColor: 'var(--text-color)',
                padding: '0.6rem 1.4rem',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              FACULTY COORDINATORS ({teachers.length})
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className="neo-btn"
              style={{
                background: activeTab === 'students' ? 'var(--text-color)' : 'var(--white)',
                color: activeTab === 'students' ? 'var(--white)' : 'var(--text-color)',
                borderColor: 'var(--text-color)',
                padding: '0.6rem 1.4rem',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              STUDENT COORDINATORS ({students.length})
            </button>
          </div>
        </div>

        {/* Member Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', 
            gap: '1.5rem',
            marginTop: '2rem'
          }}
        >
          {displayedMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="neo-card" 
              style={{ 
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: '#FFFFFF'
              }}
            >
              <div>
                {/* Header Badge & Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span 
                    className={`neo-badge ${member.type === 'PRINCIPAL' || member.type === 'HOD' ? 'red' : member.type === 'TEACHER' ? 'teal' : 'yellow'}`}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', fontWeight: 800 }}
                  >
                    {member.type}
                  </span>
                  {member.type === 'PRINCIPAL' || member.type === 'HOD' ? (
                    <Award size={20} color="var(--primary-orange)" />
                  ) : member.type === 'TEACHER' ? (
                    <ShieldCheck size={20} color="var(--secondary-teal)" />
                  ) : (
                    <GraduationCap size={20} color="var(--text-color)" />
                  )}
                </div>

                {/* Profile Photo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <div 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      border: '3px solid var(--border-color)',
                      boxShadow: '4px 4px 0px var(--border-color)',
                      overflow: 'hidden',
                      background: 'var(--accent-yellow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=FFD700&color=0A192F&bold=true`;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-color)' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--primary-orange)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#555', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {member.dept}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#777', fontWeight: 600 }}>
                    GP Arwal
                  </p>
                </div>
              </div>

              {/* Contact / Footer */}
              <div 
                style={{ 
                  marginTop: '1.25rem', 
                  paddingTop: '1rem', 
                  borderTop: '2px dashed #ddd',
                  fontSize: '0.82rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  color: '#444'
                }}
              >
                {member.phone ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={14} color="var(--primary-orange)" />
                      <a href={`tel:${member.phone}`} style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                        {member.phone}
                      </a>
                    </div>
                    <a
                      href={`tel:${member.phone}`}
                      title={`Call ${member.name}`}
                      style={{
                        background: 'var(--primary-orange)',
                        color: 'white',
                        border: '1.5px solid #000',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textDecoration: 'none'
                      }}
                    >
                      <Phone size={10} />
                      <span>CALL</span>
                    </a>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888' }}>
                    <ShieldCheck size={14} color="var(--secondary-teal)" />
                    <span>Professor</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="var(--primary-orange)" />
                  <span style={{ fontSize: '0.78rem', wordBreak: 'break-all' }}>gpahackathon@gmail.com</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
