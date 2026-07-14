import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ pendingCount, onThemeToggle, theme }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar" id="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <i className="fa-solid fa-recycle"></i>
        </div>
        <div>
          <div className="sidebar-brand-text">CleanTrack</div>
          <div className="sidebar-brand-sub">v2.1 · NextGen</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Monitor</div>

        <NavLink to="/admin" className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}>
          <i className="fa-solid fa-gauge-high"></i>
          Dashboard
        </NavLink>

        <a
          href="#fleet-map"
          className="sidebar-nav-item"
          onClick={e => { e.preventDefault(); document.getElementById('fleet-map')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          <i className="fa-solid fa-map-location-dot"></i>
          Fleet Map
        </a>

        <a
          href="#activity-feed"
          className="sidebar-nav-item"
          onClick={e => { e.preventDefault(); document.getElementById('activity-feed')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          <i className="fa-solid fa-bolt"></i>
          Activity Feed
        </a>

        <a
          href="#reports-section"
          className="sidebar-nav-item"
          onClick={e => { e.preventDefault(); document.getElementById('reports-section')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          <i className="fa-solid fa-circle-exclamation"></i>
          Reports
          {pendingCount > 0 && (
            <span className="badge badge-danger" style={{ marginLeft: 'auto' }}>{pendingCount}</span>
          )}
        </a>

        <div className="sidebar-section-label">Field</div>

        <NavLink to="/collector" className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}>
          <i className="fa-solid fa-truck-fast"></i>
          Collector App
        </NavLink>

        <NavLink to="/citizen" className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}>
          <i className="fa-solid fa-bullhorn"></i>
          Citizen Portal
        </NavLink>
      </nav>

      {/* Footer / User */}
      <div className="sidebar-footer">
        <button className="sidebar-theme-btn" onClick={onThemeToggle}>
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="sidebar-user">
          <div className="sidebar-avatar">A</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Admin</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
          <a
            href="/"
            title="Logout"
            style={{ color: 'var(--text-tertiary)', fontSize: '14px', padding: '6px', borderRadius: '8px', transition: 'color .15s', textDecoration: 'none' }}
            onClick={e => { e.preventDefault(); navigate('/'); }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--red-400)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </div>

    </aside>
  );
}
