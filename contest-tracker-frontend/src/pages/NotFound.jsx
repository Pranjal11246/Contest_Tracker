// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      <div className="mesh-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Big 404 */}
        <div style={{
          fontSize: 'clamp(6rem, 15vw, 10rem)',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          letterSpacing: '-0.05em',
        }}>
          404
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved.
          Check the URL or navigate back home.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go Home
          </Link>
          <Link to="/contests" className="btn btn-secondary btn-lg">
            Browse Contests
          </Link>
        </div>
      </div>
    </div>
  );
}
