import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'var(--bg-base)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      {/* Glowing 404 */}
      <div
        style={{
          fontSize: 'clamp(80px, 20vw, 160px)',
          fontWeight: 800,
          fontFamily: "'Space Grotesk', sans-serif",
          lineHeight: 1,
          background: 'var(--grad-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.35))',
          marginBottom: '8px',
          userSelect: 'none',
        }}
      >
        404
      </div>

      {/* Icon */}
      <div
        style={{
          width: '72px',
          height: '72px',
          background: 'rgba(139,92,246,.1)',
          border: '1px solid rgba(139,92,246,.25)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          color: 'var(--violet-400)',
          margin: '0 auto 24px',
        }}
      >
        <i className="fa-solid fa-map-location-dot"></i>
      </div>

      <h1
        style={{
          fontSize: '26px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: "'Space Grotesk', sans-serif",
          marginBottom: '10px',
          letterSpacing: '-.4px',
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          maxWidth: '360px',
          marginBottom: '32px',
          lineHeight: 1.6,
        }}
      >
        Looks like this route went off-map. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <i className="fa-solid fa-house"></i> Back to Home
        </Link>
        <Link to="/admin" className="btn btn-secondary">
          <i className="fa-solid fa-gauge-high"></i> Admin Portal
        </Link>
      </div>

      {/* Decorative orbs */}
      <div
        style={{
          position: 'fixed', top: '15%', left: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed', bottom: '15%', right: '10%',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
