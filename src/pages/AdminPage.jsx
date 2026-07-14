import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { STATS, REPORTS, ACTIVITY_FEED } from '../data/mockData';

function timeAgo(isoString) {
  const diff = Math.round((Date.now() - new Date(isoString).getTime()) / 60000);
  return diff < 60 ? diff + 'm ago' : Math.round(diff / 60) + 'h ago';
}

function formatDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function getIssueBadgeClass(issueType) {
  if (issueType === 'Overflowing Bin') return 'badge badge-warning';
  if (issueType === 'Missed Collection') return 'badge badge-danger';
  return 'badge badge-neutral';
}

export default function AdminPage({ onThemeToggle, theme, showToast }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(STATS);
  const [reports, setReports] = useState(REPORTS);
  const [reportSearch, setReportSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh with slight variation
    setTimeout(() => {
      setStats(s => ({
        ...s,
        routeCompletion: Math.min(100, s.routeCompletion + Math.floor(Math.random() * 3)),
        binsToday: s.binsToday + Math.floor(Math.random() * 4),
      }));
      setIsRefreshing(false);
      showToast('Stats refreshed', 'success');
    }, 800);
  };

  const handleResolve = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    showToast('Report marked as resolved', 'success');
  };

  return (
    <div className="app-shell">
      <Sidebar pendingCount={pendingCount} onThemeToggle={onThemeToggle} theme={theme} />

      <div className="main-content">

        {/* ── PAGE HEADER ── */}
        <div className="page-header">
          <div className="page-header-left">
            <h1 className="page-title">Operations Dashboard</h1>
            <p className="page-subtitle">{formatDate()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-live"><span className="live-dot"></span> Live</span>
            <button className="btn btn-ghost btn-sm" onClick={handleRefresh} disabled={isRefreshing}>
              <i className={`fa-solid fa-rotate-right${isRefreshing ? ' fa-spin' : ''}`}></i> Refresh
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => navigate('/')}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div className="page-body">

          {/* KPI STATS GRID */}
          <div className="stats-grid stagger" id="stats-grid">

            <div className="stat-card violet">
              <div className="stat-icon violet"><i className="fa-solid fa-route"></i></div>
              <div className="stat-label">Route Completion</div>
              <div className="stat-value text-gradient">{stats.routeCompletion}%</div>
              <div className="progress-bar">
                <div className="progress-fill violet" style={{ width: stats.routeCompletion + '%' }}></div>
              </div>
              <div className="stat-trend up"><i className="fa-solid fa-arrow-trend-up"></i> +4% from yesterday</div>
            </div>

            <div className="stat-card pink">
              <div className="stat-icon pink"><i className="fa-solid fa-circle-exclamation"></i></div>
              <div className="stat-label">Open Complaints</div>
              <div className="stat-value" style={{ color: 'var(--pink-400)' }}>{pendingCount}</div>
              <div className="progress-bar">
                <div className="progress-fill pink" style={{ width: Math.min(pendingCount * 10, 100) + '%' }}></div>
              </div>
              <div className="stat-trend down">
                <i className="fa-solid fa-circle-exclamation"></i> Requires attention
              </div>
            </div>

            <div className="stat-card cyan">
              <div className="stat-icon cyan"><i className="fa-solid fa-truck"></i></div>
              <div className="stat-label">Trucks Active</div>
              <div className="stat-value" style={{ color: 'var(--cyan-400)' }}>{stats.trucksActive}</div>
              <div className="progress-bar">
                <div className="progress-fill cyan" style={{ width: '80%' }}></div>
              </div>
              <div className="stat-trend up"><i className="fa-solid fa-signal"></i> All on-route</div>
            </div>

            <div className="stat-card amber">
              <div className="stat-icon amber"><i className="fa-solid fa-trash-can"></i></div>
              <div className="stat-label">Bins Collected Today</div>
              <div className="stat-value" style={{ color: 'var(--amber-400)' }}>{stats.binsToday}</div>
              <div className="progress-bar">
                <div className="progress-fill amber" style={{ width: '60%' }}></div>
              </div>
              <div className="stat-trend up"><i className="fa-solid fa-check-double"></i> GPS verified</div>
            </div>

          </div>

          {/* MAIN CONTENT AREA: Map + Activity Feed */}
          <div className="admin-grid" id="fleet-map">

            {/* GPS MAP */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="section-header" style={{ marginBottom: '16px' }}>
                <h2 className="section-title">
                  <i className="fa-solid fa-map-location-dot" style={{ color: 'var(--violet-400)', marginRight: '9px', fontSize: '13px' }}></i>
                  Fleet GPS Map
                </h2>
                <span className="badge-live"><span className="live-dot"></span> Real-Time</span>
              </div>

              <div className="map-container">
                <div className="map-grid"></div>

                {/* Roads */}
                <div className="map-road-h" style={{ top: '33%' }}></div>
                <div className="map-road-h" style={{ top: '66%' }}></div>
                <div className="map-road-v" style={{ left: '33%' }}></div>
                <div className="map-road-v" style={{ left: '66%' }}></div>

                {/* Bin markers */}
                <div style={{ position: 'absolute', top: '28%', left: '40%', width: '9px', height: '9px', background: 'var(--green-400)', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 8px rgba(74,222,128,0.8)' }}></div>
                <div style={{ position: 'absolute', top: '55%', left: '20%', width: '9px', height: '9px', background: 'var(--amber-400)', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }}></div>
                <div style={{ position: 'absolute', top: '72%', left: '58%', width: '9px', height: '9px', background: 'var(--red-400)', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 8px rgba(248,113,113,0.8)' }}></div>

                {/* Truck 1 (active) */}
                <div className="map-truck" style={{ top: '30%', left: '35%' }}>
                  <div className="map-truck-pulse" style={{ background: 'rgba(139,92,246,0.3)' }}></div>
                  <div className="map-truck-icon" style={{ background: 'var(--violet-600)' }}>
                    <i className="fa-solid fa-truck" style={{ fontSize: '11px' }}></i>
                  </div>
                  <div className="map-truck-label">Truck #802</div>
                </div>

                {/* Truck 2 */}
                <div className="map-truck" style={{ bottom: '26%', right: '28%' }}>
                  <div className="map-truck-icon" style={{ background: 'var(--slate-600)' }}>
                    <i className="fa-solid fa-truck" style={{ fontSize: '11px' }}></i>
                  </div>
                  <div className="map-truck-label">Truck #404</div>
                </div>

                {/* Truck 3 */}
                <div className="map-truck" style={{ top: '15%', right: '18%' }}>
                  <div className="map-truck-pulse" style={{ background: 'rgba(6,182,212,0.3)' }}></div>
                  <div className="map-truck-icon" style={{ background: 'var(--cyan-600)' }}>
                    <i className="fa-solid fa-truck" style={{ fontSize: '11px' }}></i>
                  </div>
                  <div className="map-truck-label">Truck #211</div>
                </div>

                {/* Legend */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(7,7,15,0.88)', border: '1px solid var(--border-normal)', borderRadius: '10px', padding: '9px 13px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '7px' }}>Legend</div>
                  <div style={{ display: 'flex', gap: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--green-400)', fontWeight: 600 }}><span style={{ width: '8px', height: '8px', background: 'var(--green-400)', borderRadius: '50%', display: 'inline-block' }}></span>Collected</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--amber-400)', fontWeight: 600 }}><span style={{ width: '8px', height: '8px', background: 'var(--amber-400)', borderRadius: '50%', display: 'inline-block' }}></span>In-Progress</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--red-400)', fontWeight: 600 }}><span style={{ width: '8px', height: '8px', background: 'var(--red-400)', borderRadius: '50%', display: 'inline-block' }}></span>Missed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVITY FEED */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="section-header">
                <h2 className="section-title">
                  <i className="fa-solid fa-bolt" style={{ color: 'var(--amber-400)', marginRight: '9px', fontSize: '13px' }}></i>
                  Live Verification Feed
                </h2>
                <span className="badge badge-neutral">{ACTIVITY_FEED.length} events</span>
              </div>

              <div id="activity-feed">
                {ACTIVITY_FEED.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                    <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '26px', marginBottom: '10px', display: 'block', opacity: .3 }}></i>
                    No activity yet today
                  </div>
                ) : (
                  ACTIVITY_FEED.map((bin, i) => (
                    <div key={bin.id} className="feed-item" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="feed-icon" style={{ background: 'rgba(74,222,128,.1)', color: 'var(--green-400)' }}>
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                      <div className="feed-content">
                        <div className="feed-title">{bin.location}</div>
                        <div className="feed-meta">
                          <span className="badge badge-success" style={{ marginRight: '4px' }}>Verified</span>
                          {bin.id} &nbsp;·&nbsp; GPS ✓ &nbsp;·&nbsp; Photo ✓
                        </div>
                      </div>
                      <div className="feed-time">{timeAgo(bin.collectedAt)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>{/* /.admin-grid */}

          {/* REPORTS TABLE */}
          <div className="card" id="reports-section" style={{ marginTop: '20px' }}>
            <div className="section-header">
              <h2 className="section-title">
                <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--pink-400)', marginRight: '9px', fontSize: '13px' }}></i>
                Citizen Reports
              </h2>
              <div className="flex gap-2">
                <span className="badge badge-danger">{pendingCount} pending</span>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/citizen')}>+ New</button>
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: '13px', pointerEvents: 'none' }}></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by issue type, description, or location…"
                  value={reportSearch}
                  onChange={e => setReportSearch(e.target.value)}
                  style={{ paddingLeft: '36px', fontSize: '13px' }}
                />
              </div>
            </div>

            {reports.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '44px 0', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                <i className="fa-solid fa-inbox" style={{ fontSize: '30px', marginBottom: '10px', display: 'block', opacity: .25 }}></i>
                No reports submitted yet
              </div>
            ) : (() => {
              const q = reportSearch.toLowerCase();
              const filtered = reports.filter(r =>
                r.issueType.toLowerCase().includes(q) ||
                (r.description || '').toLowerCase().includes(q) ||
                r.location.toLowerCase().includes(q)
              );
              return filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '44px 0', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                  <i className="fa-solid fa-search" style={{ fontSize: '26px', marginBottom: '10px', display: 'block', opacity: .25 }}></i>
                  No reports match your search
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(report => (
                        <tr key={report.id} id={`row-${report.id}`}>
                          <td>
                            <span className={getIssueBadgeClass(report.issueType)}>
                              {report.issueType}
                            </span>
                          </td>
                          <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: '12px' }}>
                            {report.description || '—'}
                          </td>
                          <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <i className="fa-solid fa-location-dot" style={{ color: 'var(--pink-400)', marginRight: '4px' }}></i>
                            {report.location}
                          </td>
                          <td>
                            <span className={`badge ${report.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                              {report.status === 'pending' ? '⏳ Pending' : '✓ Resolved'}
                            </span>
                          </td>
                          <td style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            {new Date(report.submittedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td>
                            {report.status === 'pending' ? (
                              <button className="btn btn-primary btn-sm" onClick={() => handleResolve(report.id)}>
                                Resolve
                              </button>
                            ) : (
                              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Closed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>

        </div>{/* /.page-body */}
      </div>{/* /.main-content */}
    </div>
  );
}
