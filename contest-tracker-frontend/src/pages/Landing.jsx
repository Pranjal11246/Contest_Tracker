// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Live Countdowns',
    desc: 'Real-time countdown timers so you never miss a contest start.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Smart Search & Filter',
    desc: 'Filter by platform, status, and duration. Find contests instantly.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Multi-Platform',
    desc: 'Track Codeforces, LeetCode, CodeChef, AtCoder, and more.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: 'Bookmark Contests',
    desc: 'Save contests you want to participate in for quick access.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Secure Auth',
    desc: 'JWT-based authentication with email OTP verification.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Beautiful Dashboard',
    desc: 'Clean, modern UI inspired by Vercel and Linear.',
  },
];

const platforms = ['Codeforces', 'LeetCode', 'CodeChef', 'AtCoder', 'HackerRank', 'TopCoder'];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      <div className="mesh-bg" />

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="badge badge-accent">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              Now with live countdown timers
            </span>
          </div>

          <h1 className="hero-title">
            Never Miss a{' '}
            <span className="gradient-text">Coding Contest</span>
            {' '}Again
          </h1>

          <p className="hero-subtitle">
            Track upcoming contests across Codeforces, LeetCode, CodeChef and more.
            Get live countdowns, smart filters, and a beautiful dashboard — all in one place.
          </p>

          <div className="hero-cta">
            {isAuthenticated ? (
              <>
                <Link to="/contests" className="btn btn-primary btn-xl">
                  Browse Contests
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-xl">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-xl">
                  Get Started Free
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/contests" className="btn btn-secondary btn-xl">Browse Contests</Link>
              </>
            )}
          </div>

          {/* Platform badges */}
          <div className="hero-platforms">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Supports</span>
            {platforms.map(p => (
              <span key={p} className={`badge badge-${p.toLowerCase().replace(/[^a-z]/g, '')}`}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner">
            {[
              { value: '6+', label: 'Platforms' },
              { value: '∞', label: 'Contests Tracked' },
              { value: '100%', label: 'Free to Use' },
              { value: '24/7', label: 'Live Updates' },
            ].map(({ value, label }) => (
              <div key={label} className="stats-strip-item">
                <div className="stats-strip-value">{value}</div>
                <div className="stats-strip-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>Features</span>
            <h2 className="section-title">Everything you need to <span className="gradient-text">compete & win</span></h2>
            <p className="section-subtitle">
              A complete contest tracking toolkit built for competitive programmers.
            </p>
          </div>

          <div className="features-grid">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon">{icon}</div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to start competing?</h2>
            <p className="cta-subtitle">
              Join thousands of competitive programmers tracking contests every day.
            </p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Link to="/contests" className="btn btn-primary btn-xl">Browse Contests</Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-xl">Create Free Account</Link>
                  <Link to="/login" className="btn btn-secondary btn-xl">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div className="auth-logo-icon" style={{ width: '1.75rem', height: '1.75rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                    <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.9375rem' }}>ContestTracker</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                Track contests. Never miss a round.
              </p>
            </div>
            <div className="footer-links">
              <Link to="/contests">Contests</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              © {new Date().getFullYear()} ContestTracker. Built for competitive programmers.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
