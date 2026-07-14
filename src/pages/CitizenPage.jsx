import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ISSUE_TYPES = [
  { key: 'Overflowing Bin', icon: 'fa-dumpster-fire', color: 'var(--amber-400)' },
  { key: 'Missed Collection', icon: 'fa-truck-ramp-box', color: 'var(--pink-400)' },
  { key: 'Damaged Bin', icon: 'fa-trash-can', color: 'var(--cyan-400)' },
  { key: 'Illegal Dumping', icon: 'fa-ban', color: 'var(--red-400)' },
];

export default function CitizenPage({ onThemeToggle, theme, showToast }) {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Detecting GPS location…');
  const [locationValue, setLocationValue] = useState('');
  const [locLoading, setLocLoading] = useState(true);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [issueError, setIssueError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // Detect GPS location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('GPS not available — enter manually');
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const str = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setLocation(str);
        setLocationValue(str);
        setLocLoading(false);
      },
      () => {
        setLocation('Navi Mumbai, Maharashtra (approx.)');
        setLocationValue('Navi Mumbai, Maharashtra');
        setLocLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  }, []);

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIssue) {
      setIssueError(true);
      return;
    }
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setSelectedIssue('');
    setDescription('');
    setPhotoFile(null);
    setPhotoPreview('');
    setIssueError(false);
    setIsSubmitting(false);
    setSubmitted(false);
  };

  return (
    <div className="citizen-shell">

      {/* ── HEADER ── */}
      <div className="citizen-header">
        <Link
          to="/"
          style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,.08)', border: '1px solid rgba(139,92,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet-400)', textDecoration: 'none', transition: 'all .15s', flexShrink: 0 }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(139,92,246,.18)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(139,92,246,.08)'}
        >
          <i className="fa-solid fa-arrow-left" style={{ fontSize: '13px' }}></i>
        </Link>
        <div>
          <h1 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-.3px', fontFamily: "'Space Grotesk',sans-serif" }}>Report an Issue</h1>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>Help keep your city clean & safe</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className="badge badge-info"><i className="fa-solid fa-shield-halved" style={{ marginRight: '3px' }}></i>Public</span>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="citizen-body">

        {/* SUCCESS STATE */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{ width: '88px', height: '88px', background: 'var(--grad-brand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', color: 'white', margin: '0 auto 22px', animation: 'bounceIn .5s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: '0 0 40px rgba(139,92,246,.4)' }}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: "'Space Grotesk',sans-serif" }}>Report Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Your report has been received and assigned to the nearest team.</p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginBottom: '30px' }}>Typical resolution time: <strong style={{ color: 'var(--violet-400)' }}>2–4 hours</strong></p>
            <div className="flex gap-3 justify-center">
              <button className="btn btn-secondary" onClick={resetForm}><i className="fa-solid fa-plus"></i> Submit Another</button>
              <Link to="/" className="btn btn-primary"><i className="fa-solid fa-house"></i> Back to Home</Link>
            </div>
          </div>
        ) : (

          /* FORM */
          <>
            {/* Hero */}
            <div className="report-hero">
              <div className="report-hero-icon">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h2 className="report-hero-title">Spot Garbage? Report It.</h2>
              <p className="report-hero-sub">Help us keep Navi Mumbai clean by reporting missed or overflowing bins near you.</p>
            </div>

            <form id="report-form" noValidate onSubmit={handleSubmit}>

              {/* Issue Type */}
              <div className="form-group">
                <label className="form-label">Issue Type <span style={{ color: 'var(--pink-400)' }}>*</span></label>
                <div className="issue-grid">
                  {ISSUE_TYPES.map(issue => (
                    <button
                      key={issue.key}
                      type="button"
                      className={`issue-btn${selectedIssue === issue.key ? ' selected' : ''}`}
                      onClick={() => { setSelectedIssue(issue.key); setIssueError(false); }}
                    >
                      <i className={`fa-solid ${issue.icon}`} style={{ display: 'block', fontSize: '20px', marginBottom: '8px', color: issue.color }}></i>
                      {issue.key}
                    </button>
                  ))}
                </div>
                {issueError && (
                  <p style={{ fontSize: '11px', color: 'var(--pink-400)', marginTop: '6px' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '4px' }}></i>Please select an issue type.
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">Description (optional)</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Describe the issue in detail — e.g. 'Bin at the gate has been overflowing since Monday…'"
                  rows={3}
                  maxLength={280}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: description.length >= 260
                      ? 'var(--pink-400)'
                      : description.length >= 200
                        ? 'var(--amber-400)'
                        : 'var(--text-tertiary)',
                  }}>
                    {description.length} / 280
                  </span>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="form-group">
                <label className="form-label">Photo Evidence</label>
                <div
                  className="photo-upload"
                  onClick={() => fileInputRef.current?.click()}
                  style={photoPreview ? { borderColor: 'var(--green-500)', background: 'rgba(16,185,129,.06)' } : {}}
                >
                  <i className={`fa-solid ${photoFile ? 'fa-check' : 'fa-camera'}`}></i>
                  <span>{photoFile ? photoFile.name : 'Tap to upload photo'}</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={handlePhotoSelect}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{ width: '100%', borderRadius: '13px', marginTop: '10px', maxHeight: '210px', objectFit: 'cover', border: '1px solid var(--border-normal)' }}
                  />
                )}
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">Location</label>
                <div className="location-display">
                  <i className="fa-solid fa-location-dot pin"></i>
                  <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)' }}>{location}</span>
                  {locLoading && <span className="spinner"></span>}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary btn-lg" id="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><span className="spinner"></span> Submitting...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane"></i> Submit Report</>
                )}
              </button>

            </form>
          </>
        )}

      </div>{/* /.citizen-body */}

      {/* Theme FAB */}
      <button className="theme-fab" onClick={onThemeToggle} title="Toggle Theme">
        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

    </div>
  );
}
