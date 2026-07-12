// Toast notification component
export default function Toast({ toasts }) {
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <i className={`fa-solid ${icons[toast.type] || icons.info}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
