// Toast notification component
export default function Toast({ toasts, onDismiss }) {
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className={`fa-solid ${icons[toast.type] || icons.info}`} style={{ flexShrink: 0 }}></i>
          <span style={{ flex: 1 }}>{toast.message}</span>
          {onDismiss && (
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                opacity: 0.6,
                padding: '0 2px',
                fontSize: '14px',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'opacity .15s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '1'}
              onMouseOut={e => e.currentTarget.style.opacity = '0.6'}
              title="Dismiss"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
