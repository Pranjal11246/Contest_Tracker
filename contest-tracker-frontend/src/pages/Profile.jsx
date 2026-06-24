// src/pages/Profile.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: 720 }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Profile</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Your account information</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Avatar Card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
          <div className="avatar avatar-xl">{getInitials(user?.email)}</div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{user?.email}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className={`badge ${user?.role === 'ADMIN' ? 'badge-accent' : 'badge-info'}`}>{user?.role}</span>
              <span className={`badge ${user?.verified ? 'badge-success' : 'badge-warning'}`}>
                {user?.verified ? '✓ Verified' : '⚠ Not Verified'}
              </span>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8125rem' }}>
            Account Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Email Address', value: user?.email, icon: '✉' },
              { label: 'Account Role', value: user?.role, icon: '🛡' },
              { label: 'Email Verified', value: user?.verified ? 'Yes — email confirmed' : 'No — check your inbox', icon: '✓' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{icon} {label}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Security
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Password</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Change your account password</div>
            </div>
            <Link to="/forgot-password" className="btn btn-secondary btn-sm">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
