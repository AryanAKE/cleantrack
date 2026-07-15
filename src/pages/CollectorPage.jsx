import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BINS } from '../data/mockData';
// Dustbin image — using a placeholder since asset was reset by Vite scaffold
const dustbinImg = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80';

// Scan flow states
const SCAN_STATES = { IDLE: 'idle', SCANNING: 'scanning', PHOTO: 'photo', SUCCESS: 'success' };

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time || '--:--'}</span>;
}

export default function CollectorPage({ onThemeToggle, theme, showToast }) {
  const navigate = useNavigate();
  const [bins, setBins] = useState([...BINS]);
  const [doneCount, setDoneCount] = useState(0);
  const [scanState, setScanState] = useState(SCAN_STATES.IDLE);
  const [statusText, setStatusText] = useState('Step 1: Tap the area above to scan the bin QR code.');
  const [flowRunning, setFlowRunning] = useState(false);

  const currentBin = bins[0] || null;
  const queueBins = bins.slice(1);
  const allDone = bins.length === 0;

  const startCollectionFlow = () => {
    if (flowRunning || !currentBin || scanState === SCAN_STATES.SUCCESS) return;
    setFlowRunning(true);

    // Step 1: Scanning
    setScanState(SCAN_STATES.SCANNING);
    setStatusText('Detecting QR Code... hold steady.');

    setTimeout(() => {
      // Step 2: Photo
      setScanState(SCAN_STATES.PHOTO);
      setStatusText('Capturing verification photo...');

      setTimeout(() => {
        // Step 3: Success
        setScanState(SCAN_STATES.SUCCESS);
        setStatusText('Upload complete. GPS & Photo verified. ✓');
        setDoneCount(c => c + 1);
      }, 2000);
    }, 2500);
  };

  const loadNextBin = (e) => {
    e.stopPropagation();
    // Remove current bin from queue
    setBins(prev => prev.slice(1));
    setScanState(SCAN_STATES.IDLE);
    setStatusText('Step 1: Tap the area above to scan the bin QR code.');
    setFlowRunning(false);
    if (bins.length > 1) {
      showToast(`Now collecting: ${bins[1].location}`, 'info');
    }
  };

  const resetAllBins = () => {
    setBins([...BINS]);
    setDoneCount(0);
    setScanState(SCAN_STATES.IDLE);
    setStatusText('Step 1: Tap the area above to scan the bin QR code.');
    setFlowRunning(false);
    showToast('Demo reset', 'info');
  };

  const skipBin = () => {
    if (!currentBin || flowRunning) return;
    // Move current bin to end of queue
    setBins(prev => [...prev.slice(1), { ...prev[0], skipped: true }]);
    setScanState(SCAN_STATES.IDLE);
    setStatusText('Step 1: Tap the area above to scan the bin QR code.');
    setFlowRunning(false);
    showToast(`Skipped ${currentBin.location} — moved to end of queue`, 'info');
  };

  return (
    <div className="collector-shell">

      {/* ── HEADER ── */}
      <div className="collector-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="sidebar-avatar" style={{ width: '42px', height: '42px', fontSize: '16px' }}>R</div>
            <div>
              <div style={{ fontSize: '9px', color: 'var(--violet-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Driver</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-.4px', fontFamily: "'Space Grotesk',sans-serif" }}>Rajesh Kumar</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-live"><span className="live-dot"></span> On Shift</span>
            <button className="btn btn-danger btn-sm" onClick={() => navigate('/')}>
              <i className="fa-solid fa-right-from-bracket"></i> End Shift
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="collector-stats-row">
          <div className="collector-stat">
            <div className="collector-stat-value green">{doneCount}</div>
            <div className="collector-stat-label">Collected</div>
          </div>
          <div className="collector-stat">
            <div className="collector-stat-value">{BINS.length}</div>
            <div className="collector-stat-label">Total</div>
          </div>
          <div className="collector-stat">
            <div className="collector-stat-value violet"><Clock /></div>
            <div className="collector-stat-label">Time</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Shift Progress</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: doneCount === BINS.length ? 'var(--green-400)' : 'var(--violet-400)' }}>
              {Math.round((doneCount / BINS.length) * 100)}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.round((doneCount / BINS.length) * 100)}%`,
                background: doneCount === BINS.length ? 'var(--green-400)' : 'var(--grad-brand)',
                borderRadius: '10px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="collector-body">

        {allDone ? (
          /* ALL DONE STATE */
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{ width: '90px', height: '90px', background: 'var(--grad-brand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', color: 'white', margin: '0 auto 22px', boxShadow: '0 0 40px rgba(139,92,246,.4)' }}>
              <i className="fa-solid fa-trophy"></i>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: "'Space Grotesk',sans-serif" }}>All Bins Collected!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '26px' }}>Excellent work — route complete for today.</p>
            <button className="btn btn-secondary" onClick={resetAllBins}>
              <i className="fa-solid fa-rotate-right"></i> Reset Demo
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Current Assignment</h3>

            {/* TASK CARD */}
            <div className="task-card" id="task-card">
              <div className="task-card-header">
                <span className="badge badge-info">
                  <i className="fa-solid fa-qrcode" style={{ marginRight: '4px' }}></i>
                  {currentBin.id}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                  <i className="fa-solid fa-location-arrow" style={{ color: 'var(--cyan-400)', marginRight: '4px' }}></i>
                  {currentBin.distance}
                </span>
              </div>

              <div className="task-location">
                <div className="task-location-name">{currentBin.location}</div>
                <div className="task-location-sub">{currentBin.area}</div>
              </div>

              {/* SCAN AREA */}
              <div
                className={`scan-area${scanState !== SCAN_STATES.IDLE && scanState !== SCAN_STATES.SUCCESS ? ' active' : ''}`}
                onClick={startCollectionFlow}
              >
                {/* State: Idle */}
                {scanState === SCAN_STATES.IDLE && (
                  <div className="scan-state">
                    <div style={{ width: '68px', height: '68px', background: 'rgba(139,92,246,.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '2px solid rgba(139,92,246,.2)' }}>
                      <i className="fa-solid fa-qrcode" style={{ fontSize: '28px', color: 'var(--violet-400)' }}></i>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Tap to Scan Bin QR</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '5px' }}>Align camera over the QR code</p>
                  </div>
                )}

                {/* State: Scanning */}
                {scanState === SCAN_STATES.SCANNING && (
                  <div className="scan-state">
                    <img src={dustbinImg} className="w-full h-full object-cover" style={{ position: 'absolute', inset: 0, opacity: .65 }} alt="Bin" />
                    <div className="scanner-beam"></div>
                    <div className="scanner-corners">
                      <div className="scanner-corner tl"></div>
                      <div className="scanner-corner tr"></div>
                      <div className="scanner-corner bl"></div>
                      <div className="scanner-corner br"></div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '14px', fontSize: '11px', color: 'white', fontFamily: 'monospace', letterSpacing: '2px', textShadow: '0 1px 4px rgba(0,0,0,.8)' }}>SCANNING BIN...</div>
                  </div>
                )}

                {/* State: Photo Capture */}
                {scanState === SCAN_STATES.PHOTO && (
                  <div className="scan-state">
                    <img src={dustbinImg} className="w-full h-full object-cover" style={{ position: 'absolute', inset: 0, filter: 'brightness(.75)' }} alt="Bin" />
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '20px', background: 'linear-gradient(to top,rgba(0,0,0,.8),transparent)', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '54px', height: '54px', border: '4px solid rgba(255,255,255,.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', animation: 'pulseDot .8s ease infinite' }}></div>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,.65)', borderRadius: '8px', padding: '5px 11px', fontSize: '11px', fontWeight: 700, color: 'white' }}>📷 Capturing...</div>
                  </div>
                )}

                {/* State: Success */}
                {scanState === SCAN_STATES.SUCCESS && (
                  <div className="scan-state success-overlay">
                    <div className="success-check">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px', fontFamily: "'Space Grotesk',sans-serif" }}>Verified!</h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', marginBottom: '22px' }}>GPS &amp; Photo matched successfully</p>
                    <button
                      className="btn"
                      style={{ background: 'rgba(255,255,255,.18)', color: 'white', border: '2px solid rgba(255,255,255,.35)', fontSize: '14px', padding: '12px 30px', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                      onClick={loadNextBin}
                    >
                      Next Bin <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                )}

              </div>{/* /.scan-area */}

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{statusText}</p>
                {scanState === SCAN_STATES.IDLE && bins.length > 1 && (
                  <button
                    style={{ marginTop: '10px', background: 'none', border: '1px solid var(--border-normal)', borderRadius: '8px', padding: '6px 16px', fontSize: '11px', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all .15s' }}
                    onClick={skipBin}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--amber-400)'; e.currentTarget.style.color = 'var(--amber-400)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-normal)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  >
                    <i className="fa-solid fa-forward"></i> Skip Bin
                  </button>
                )}
              </div>
            </div>{/* /.task-card */}

            {/* QUEUE LIST */}
            {queueBins.length > 0 && (
              <>
                <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', margin: '24px 0 12px' }}>
                  Up Next — {queueBins.length} remaining
                </h3>
                <div id="queue-list">
                  {queueBins.map((bin, i) => (
                    <div className="queue-item" key={bin.id} id={`queue-${bin.id}`}>
                      <div className="queue-number">{i + 2}</div>
                      <div className="queue-info">
                        <div className="queue-name">
                          {bin.location}
                          {bin.skipped && (
                            <span style={{ marginLeft: '8px', fontSize: '9px', background: 'rgba(251,191,36,.15)', color: 'var(--amber-400)', border: '1px solid rgba(251,191,36,.3)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, letterSpacing: '.5px' }}>SKIPPED</span>
                          )}
                        </div>
                        <div className="queue-meta">{bin.id} &nbsp;·&nbsp; {bin.area}</div>
                      </div>
                      <div className="queue-dist"><i className="fa-solid fa-location-arrow" style={{ marginRight: '4px' }}></i>{bin.distance}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

      </div>{/* /.collector-body */}

      {/* Theme FAB */}
      <button className="theme-fab" onClick={onThemeToggle} title="Toggle Theme">
        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

    </div>
  );
}
