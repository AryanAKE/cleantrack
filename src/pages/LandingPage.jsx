import { Link } from 'react-router-dom';

export default function LandingPage({ onThemeToggle, theme }) {
  return (
    <div className="login-page">

      {/* ── LEFT PANEL: Brand Hero ─────────────────────────────── */}
      <div className="login-left">
        <div className="login-left-bg">
          <div className="login-left-orb orb-1"></div>
          <div className="login-left-orb orb-2"></div>
          <div className="login-left-orb orb-3"></div>
        </div>

        <div className="login-left-content">
          <div className="login-logo">
            <i className="fa-solid fa-recycle"></i>
          </div>
          <h1 className="login-brand">CleanTrack</h1>
          <p className="login-tagline">Smart Waste Management · Real-Time Verification Platform</p>

          <div className="login-features stagger">
            <div className="login-feature">
              <div className="login-feature-icon" style={{ background: 'rgba(139,92,246,.15)', color: 'var(--violet-400)' }}>
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <div className="login-feature-text">
                <strong>QR-Based Verification</strong>
                Every bin scan creates a tamper-proof proof of collection.
              </div>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon" style={{ background: 'rgba(6,182,212,.15)', color: 'var(--cyan-400)' }}>
                <i className="fa-solid fa-satellite-dish"></i>
              </div>
              <div className="login-feature-text">
                <strong>GPS Route Tracking</strong>
                Real-time fleet location pinned against planned routes.
              </div>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon" style={{ background: 'rgba(251,191,36,.12)', color: 'var(--amber-400)' }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="login-feature-text">
                <strong>Live Admin Dashboard</strong>
                Monitor completion rates, complaints, and truck status.
              </div>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon" style={{ background: 'rgba(244,114,182,.12)', color: 'var(--pink-400)' }}>
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div className="login-feature-text">
                <strong>Citizen Reporting</strong>
                Public portal for overflowing bins and missed collections.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Role Selector ────────────────────────── */}
      <div className="login-right">
        <div className="animate-fade-up">
          <h2 className="login-right-title">Select your role</h2>
          <p className="login-right-sub">Choose the portal that matches your access level to continue.</p>

          {/* Admin */}
          <Link to="/admin" className="role-btn admin">
            <div className="role-btn-icon">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <div className="role-btn-info">
              <div className="role-btn-label">Control Center</div>
              <div className="role-btn-title">Admin Portal</div>
              <div className="role-btn-desc">Live fleet map, KPIs, and complaint management</div>
            </div>
            <i className="fa-solid fa-chevron-right role-btn-arrow"></i>
          </Link>

          {/* Collector */}
          <Link to="/collector" className="role-btn collector">
            <div className="role-btn-icon">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div className="role-btn-info">
              <div className="role-btn-label">Field Operations</div>
              <div className="role-btn-title">Collector App</div>
              <div className="role-btn-desc">Scan bins, capture photos, and verify GPS</div>
            </div>
            <i className="fa-solid fa-chevron-right role-btn-arrow"></i>
          </Link>

          {/* Citizen */}
          <Link to="/citizen" className="role-btn citizen">
            <div className="role-btn-icon">
              <i className="fa-solid fa-bullhorn"></i>
            </div>
            <div className="role-btn-info">
              <div className="role-btn-label">Public Access</div>
              <div className="role-btn-title">Citizen Report</div>
              <div className="role-btn-desc">Report overflowing or missed garbage bins</div>
            </div>
            <i className="fa-solid fa-chevron-right role-btn-arrow"></i>
          </Link>

          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '30px' }}>
            <i className="fa-solid fa-shield-halved" style={{ color: 'var(--violet-500)', marginRight: '5px' }}></i>
            Secured by CleanTrack &nbsp;·&nbsp; v2.1
          </p>
        </div>

        {/* Theme Toggle FAB */}
        <button className="theme-fab" onClick={onThemeToggle} title="Toggle Theme">
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

    </div>
  );
}
