import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft, Upload, FileText, Image as ImageIcon, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function SubmitProject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    registrationNumber: '',
    collegeName: '',
    mobileNumber: '',
    email: '',
    hardwareNotes: '',
    backupDriveLink: ''
  });

  const [pptFile, setPptFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]); // Array of { file, preview }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 15MB limit check
      if (file.size > 15 * 1024 * 1024) {
        alert("PPT / PDF file size is too large (Maximum 15MB). Please compress it or use Google Drive link.");
        return;
      }
      setPptFile(file);
    }
  };

  const handlePhotosChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    if (photoFiles.length + selectedFiles.length > 3) {
      alert(`Maximum 3 photos allowed. You currently have ${photoFiles.length} photo(s) selected.`);
      return;
    }

    selectedFiles.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`Photo "${file.name}" is too large (Maximum 10MB per photo).`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoFiles(prev => {
          if (prev.length >= 3) return prev;
          return [...prev, { file, preview: reader.result }];
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input so user can pick again if needed
    e.target.value = '';
  };

  const handleRemovePhoto = (index) => {
    setPhotoFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  // Helper to read File as Base64 string (without the data URL prefix)
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        // Split data:application/pdf;base64,xxxx
        const base64String = result.split(',')[1] || result;
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pptFile) {
      setError('Please upload your PPT / PDF Presentation file.');
      return;
    }

    if (!photoFiles || photoFiles.length === 0) {
      setError('Please upload at least 1 photo of your Hardware Prototype (Minimum: 1, Maximum: 3 photos).');
      return;
    }

    if (photoFiles.length > 3) {
      setError('You can upload a maximum of 3 photos for your Hardware Prototype.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert files to base64 for email attachments
      let pptBase64 = null;
      try {
        pptBase64 = await fileToBase64(pptFile);
      } catch (err) {
        console.warn("Error converting PPT to base64:", err);
      }

      // Convert all photo files to base64
      const photoAttachmentsData = [];
      for (let i = 0; i < photoFiles.length; i++) {
        try {
          const base64Data = await fileToBase64(photoFiles[i].file);
          photoAttachmentsData.push({
            file: photoFiles[i].file,
            base64: base64Data,
            index: i + 1
          });
        } catch (err) {
          console.warn(`Error converting photo ${i + 1} to base64:`, err);
        }
      }

      // Helper to generate formatted filename: TeamName_LeaderName_CollegeName_Email
      const sanitizeName = (str) => (str || '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      const teamPart = sanitizeName(formData.teamName) || 'Team';
      const leaderPart = sanitizeName(formData.leaderName) || 'Leader';
      const collegePart = sanitizeName(formData.collegeName) || 'College';
      const emailPart = (formData.email || '').trim().replace(/[^a-zA-Z0-9@._-]/g, '_');
      
      const fileExt = pptFile.name.substring(pptFile.name.lastIndexOf('.')) || '.pdf';
      const formattedPptName = `${teamPart}_${leaderPart}_${collegePart}_${emailPart}${fileExt}`;

      // 1. Prepare attachments for Resend
      const attachments = [];
      if (pptBase64) {
        attachments.push({
          filename: formattedPptName,
          content: pptBase64
        });
      }

      photoAttachmentsData.forEach((pItem) => {
        const photoExt = pItem.file.name.substring(pItem.file.name.lastIndexOf('.')) || '.jpg';
        attachments.push({
          filename: `${teamPart}_${leaderPart}_PrototypePhoto_${pItem.index}${photoExt}`,
          content: pItem.base64
        });
      });

      // 2. Save submission record in Firestore
      try {
        await addDoc(collection(db, "project_submissions"), {
          teamName: formData.teamName.trim(),
          leaderName: formData.leaderName.trim(),
          registrationNumber: formData.registrationNumber.trim(),
          collegeName: formData.collegeName.trim(),
          mobileNumber: formData.mobileNumber.trim(),
          email: formData.email.trim(),
          hardwareNotes: formData.hardwareNotes.trim(),
          backupDriveLink: formData.backupDriveLink.trim(),
          pptFileName: formattedPptName,
          originalPptFileName: pptFile.name,
          pptFileSize: `${(pptFile.size / (1024 * 1024)).toFixed(2)} MB`,
          photoCount: photoFiles.length,
          photoFileNames: photoFiles.map(p => p.file.name),
          submittedAt: serverTimestamp(),
          type: 'PPT_PROTOTYPE_UPLOAD'
        });
      } catch (firestoreErr) {
        console.warn("Firestore record save note:", firestoreErr);
      }

      // 3. Compose Email HTML for gpahackathon@gmail.com
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 2px solid #0A192F; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #FF5722; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">INNOVEXA 2026</h1>
            <p style="margin: 5px 0 0; font-size: 15px; font-weight: bold;">New PPT & Hardware Prototype Upload Submission</p>
          </div>
          
          <div style="padding: 24px; background-color: #F9F7F1;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #0A192F;">
              <tr style="background-color: #ffffff; border-bottom: 2px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold; width: 35%;">Team Name</td>
                <td style="padding: 12px; color: #FF5722; font-weight: bold; font-size: 16px;">${formData.teamName}</td>
              </tr>
              <tr style="background-color: #fcfcfc; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">Leader Name</td>
                <td style="padding: 12px;">${formData.leaderName}</td>
              </tr>
              <tr style="background-color: #ffffff; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">Registration / Roll No.</td>
                <td style="padding: 12px; font-weight: bold;">${formData.registrationNumber}</td>
              </tr>
              <tr style="background-color: #fcfcfc; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">College Name</td>
                <td style="padding: 12px;">${formData.collegeName}</td>
              </tr>
              <tr style="background-color: #ffffff; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">Mobile / WhatsApp No.</td>
                <td style="padding: 12px;"><a href="tel:${formData.mobileNumber}" style="color: #008080; text-decoration: none; font-weight: bold;">${formData.mobileNumber}</a></td>
              </tr>
              <tr style="background-color: #fcfcfc; border-bottom: 2px solid #e0e0e0;">
                <td style="padding: 12px; font-weight: bold;">Email ID</td>
                <td style="padding: 12px;"><a href="mailto:${formData.email}" style="color: #008080; text-decoration: none; font-weight: bold;">${formData.email}</a></td>
              </tr>
            </table>

            <div style="margin-top: 25px; padding: 18px; background-color: #ffffff; border: 2px solid #0A192F; border-radius: 6px;">
              <h3 style="margin-top: 0; color: #008080; font-size: 17px; border-bottom: 2px solid #008080; padding-bottom: 6px;">
                📎 Uploaded Files (Attached with this Email)
              </h3>
              
              <ul style="list-style: none; padding: 0; margin: 10px 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  📄 <strong>Presentation File:</strong> ${pptFile.name} (${(pptFile.size / (1024 * 1024)).toFixed(2)} MB)
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  📷 <strong>Hardware Prototype Photos (${photoFiles.length} uploaded):</strong>
                  <ul style="margin: 5px 0 0; padding-left: 20px;">
                    ${photoFiles.map((p, idx) => `
                      <li>Photo ${idx + 1}: ${p.file.name} (${(p.file.size / (1024 * 1024)).toFixed(2)} MB)</li>
                    `).join('')}
                  </ul>
                </li>
                ${formData.backupDriveLink ? `
                  <li style="padding: 8px 0;">
                    🔗 <strong>Demo / Drive Link (Optional):</strong> <a href="${formData.backupDriveLink}" target="_blank">${formData.backupDriveLink}</a>
                  </li>
                ` : ''}
              </ul>

              ${formData.hardwareNotes ? `
                <div style="margin-top: 15px; padding: 12px; background: #FFF8E1; border: 1px solid #FFE082; border-radius: 4px;">
                  <strong style="color: #F57F17;">Prototype Description & Notes:</strong>
                  <p style="margin: 6px 0 0; line-height: 1.5; color: #333; font-size: 14px;">${formData.hardwareNotes}</p>
                </div>
              ` : ''}
            </div>
            
            <p style="font-size: 12px; color: #888; text-align: center; margin-top: 25px;">
              Uploaded through INNOVEXA 2026 Portal • Government Polytechnic Arwal
            </p>
          </div>
        </div>
      `;

      // 4. Send Email via /api/send-email
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: ['gpahackathon@gmail.com'],
            subject: `[INNOVEXA 2026] PPT & Prototype Upload: Team "${formData.teamName}" (${formData.registrationNumber})`,
            html: emailHtml,
            attachments: attachments
          })
        });

        if (!emailResponse.ok) {
          const errData = await emailResponse.json().catch(() => ({}));
          console.warn("Email API response warning:", errData);
        }
      } catch (emailErr) {
        console.warn("Email send exception:", emailErr);
      }

      setSuccess(true);
    } catch (err) {
      console.error("Submission failed: ", err);
      setError("Failed to submit files. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-color)' }}>
        <div className="neo-card text-center" style={{ maxWidth: '540px', width: '100%', background: 'var(--white)', padding: '2.5rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <CheckCircle2 color="var(--secondary-teal)" size={64} />
          </div>
          <h2 style={{ color: 'var(--secondary-teal)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            FILES UPLOADED & SENT! 🎉
          </h2>
          <p style={{ margin: '1rem 0 1.5rem', fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.6' }}>
            Thank you, Team <strong>{formData.teamName}</strong>! Your PPT/PDF and {photoFiles.length} Prototype Photo(s) have been successfully uploaded and sent directly to <strong>gpahackathon@gmail.com</strong>.
          </p>
          <div style={{ background: '#f5f5f5', border: '2px solid var(--border-color)', borderRadius: '4px', padding: '1rem', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem' }}>
            <div><strong>Leader:</strong> {formData.leaderName}</div>
            <div><strong>Reg / Roll No:</strong> {formData.registrationNumber}</div>
            <div><strong>College:</strong> {formData.collegeName}</div>
            <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>PPT File:</strong> {pptFile?.name}</div>
            <div><strong>Prototype Photos:</strong> {photoFiles.map(p => p.file.name).join(', ')} ({photoFiles.length} photo(s))</div>
          </div>
          <button onClick={() => navigate('/')} className="neo-btn neo-btn-primary" style={{ width: '100%' }}>
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button 
          onClick={() => navigate('/')} 
          className="neo-btn neo-btn-outline" 
          style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={18} /> BACK TO HOME
        </button>

        <div className="neo-card" style={{ background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="neo-badge teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={16} /> PPT / PDF UPLOAD
              </span>
              <span className="neo-badge yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ImageIcon size={16} /> PROTOTYPE PHOTO
              </span>
            </div>
            <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              PPT & PROTOTYPE UPLOAD
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto', fontSize: '1rem' }}>
              Upload your presentation PDF/PPT and Hardware Prototype photo for INNOVEXA 2026. All details will be sent to <strong>gpahackathon@gmail.com</strong>.
            </p>
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
              <input 
                required 
                type="text" 
                name="teamName" 
                placeholder="Enter your registered team name"
                value={formData.teamName} 
                onChange={handleInputChange} 
                style={inputStyle} 
              />
            </div>

            <div className="form-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>2. Team Leader Name *</label>
                <input 
                  required 
                  type="text" 
                  name="leaderName" 
                  placeholder="Leader full name"
                  value={formData.leaderName} 
                  onChange={handleInputChange} 
                  style={inputStyle} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>3. Registration / Roll Number *</label>
                <input 
                  required 
                  type="text" 
                  name="registrationNumber" 
                  placeholder="Registration / Roll No."
                  value={formData.registrationNumber} 
                  onChange={handleInputChange} 
                  style={inputStyle} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>4. College Name *</label>
              <input 
                required 
                type="text" 
                name="collegeName" 
                placeholder="College / Institute Name"
                value={formData.collegeName} 
                onChange={handleInputChange} 
                style={inputStyle} 
              />
            </div>

            <div className="form-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>5. Mobile / WhatsApp Number *</label>
                <input 
                  required 
                  type="tel" 
                  name="mobileNumber" 
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber} 
                  onChange={handleInputChange} 
                  style={inputStyle} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>6. Email Address *</label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  placeholder="leader.email@example.com"
                  value={formData.email} 
                  onChange={handleInputChange} 
                  style={inputStyle} 
                />
              </div>
            </div>

            {/* Direct File Uploads Section */}
            <div style={{ 
              background: '#f9f9f9', 
              border: '2px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={20} color="var(--primary-orange)" />
                Direct File Uploads
              </h3>

              {/* PPT / PDF File Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--primary-orange)" />
                  7. Upload PPT or PDF Presentation *
                </label>
                
                {/* File Naming Instruction Box */}
                <div style={{
                  background: '#FFF9E6',
                  border: '2px solid #FFB74D',
                  borderRadius: '6px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  <div style={{ fontWeight: 800, color: '#D84315', marginBottom: '0.25rem' }}>
                    📌 Mandatory File Naming Format:
                  </div>
                  <div>
                    PDF / PPT ka naam is format me hona chahiye (saara ek saath):
                  </div>
                  <div style={{ 
                    background: '#FFFFFF', 
                    padding: '0.4rem 0.6rem', 
                    borderRadius: '4px', 
                    border: '1.5px dashed #FF9800', 
                    fontFamily: 'monospace', 
                    fontWeight: 700, 
                    color: '#0A192F',
                    margin: '0.35rem 0'
                  }}>
                    TeamName_LeaderName_CollegeName_Email.pdf
                  </div>
                </div>

                <span style={{ fontSize: '0.825rem', color: '#666' }}>
                  Supported formats: <strong>.pdf, .ppt, .pptx</strong> (Maximum size: 15MB)
                </span>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '6px',
                  padding: '1.25rem',
                  background: 'white',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input 
                    required={!pptFile}
                    type="file" 
                    id="pptFileInput"
                    accept=".pdf,.ppt,.pptx"
                    onChange={handlePptChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="pptFileInput" style={{ cursor: 'pointer', display: 'block' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={32} color={pptFile ? "var(--secondary-teal)" : "#888"} />
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {pptFile ? `Selected: ${pptFile.name}` : 'Click to Browse & Upload PPT / PDF'}
                      </span>
                      {pptFile && (
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>
                          Size: {(pptFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </label>
                  {pptFile && (
                    <button 
                      type="button" 
                      onClick={() => setPptFile(null)} 
                      className="neo-btn" 
                      style={{ marginTop: '0.75rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: 'var(--status-red)', color: 'white' }}
                    >
                      <Trash2 size={14} /> Remove File
                    </button>
                  )}
                </div>
              </div>

              {/* Hardware Prototype Photo Upload (Min 1, Max 3) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={18} color="var(--secondary-teal)" />
                    8. Upload Hardware Prototype Photos *
                  </label>
                  <span className="neo-badge yellow" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                    Min: 1 Photo • Max: 3 Photos ({photoFiles.length}/3 Selected)
                  </span>
                </div>
                <span style={{ fontSize: '0.825rem', color: '#666' }}>
                  Supported formats: <strong>.jpg, .jpeg, .png, .webp</strong> (Upload 1, 2, or up to 3 clear photos of your hardware prototype)
                </span>

                {/* Upload box (active if less than 3 photos) */}
                {photoFiles.length < 3 && (
                  <div style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    background: 'white',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="file" 
                      id="photoFileInput"
                      accept="image/*"
                      multiple
                      onChange={handlePhotosChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="photoFileInput" style={{ cursor: 'pointer', display: 'block' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <ImageIcon size={32} color="#888" />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          {photoFiles.length === 0 ? 'Click to Browse & Upload Prototype Photo(s)' : '+ Add Another Prototype Photo'}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                          You can select multiple photos at once or add one by one (Up to 3 photos).
                        </span>
                      </div>
                    </label>
                  </div>
                )}

                {/* Photo Previews List */}
                {photoFiles.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                    {photoFiles.map((pItem, idx) => (
                      <div key={idx} style={{
                        background: 'white',
                        border: '2px solid var(--border-color)',
                        borderRadius: '6px',
                        padding: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          background: 'var(--text-color)',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}>
                          #{idx + 1}
                        </span>
                        <img 
                          src={pItem.preview} 
                          alt={`Prototype ${idx + 1}`} 
                          style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem' }} 
                        />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }} title={pItem.file.name}>
                          {pItem.file.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                          {(pItem.file.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemovePhoto(idx)} 
                          className="neo-btn" 
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', background: 'var(--status-red)', color: 'white', width: '100%' }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prototype Details / Video link (optional backup) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>
                  9. Video Demo / Drive Link (Optional)
                </label>
                <input 
                  type="url" 
                  name="backupDriveLink" 
                  placeholder="https://youtu.be/... or Google Drive video link (Optional)"
                  value={formData.backupDriveLink} 
                  onChange={handleInputChange} 
                  style={inputStyle} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 700 }}>
                  10. Hardware Prototype Brief Description & Components Used (Optional)
                </label>
                <textarea 
                  name="hardwareNotes" 
                  rows={3}
                  placeholder="Mention components used (e.g. Arduino, ESP32, sensors, motor drivers) or working description..."
                  value={formData.hardwareNotes} 
                  onChange={handleInputChange} 
                  style={{ ...inputStyle, resize: 'vertical' }} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="neo-btn neo-btn-primary" 
              style={{ marginTop: '1rem', padding: '1rem', width: '100%', fontSize: '1.15rem' }}
            >
              <Upload size={20} />
              {isSubmitting ? 'UPLOADING...' : 'UPLOAD'}
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
  background: '#ffffff'
};
