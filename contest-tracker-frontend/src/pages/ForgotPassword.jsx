// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    try {
      const msg = await forgotPassword(email);
      toast.success(msg || 'OTP sent! Check your email.');
      setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data || 'Failed to send OTP';
      toast.error(typeof msg === 'string' ? msg : 'Something went wrong');
      setError(typeof msg === 'string' ? msg : 'Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="mesh-bg" />
        <div className="auth-card fade-in" style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{
            width: 72, height: 72,
            background: 'var(--success-light)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32" stroke="var(--success)" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.56 6.56l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h1 className="auth-title">Check your email</h1>
          <p className="auth-subtitle" style={{ marginBottom: '1.5rem' }}>
            We sent an OTP to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.<br />
            Use it to reset your password.
          </p>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => navigate('/reset-password', { state: { email } })}
          >
            Enter OTP & Reset Password
          </button>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/login" style={{ color: 'var(--accent)' }}>← Back to login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="mesh-bg" />
      <div className="auth-card fade-in">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="auth-logo-text">ContestTracker</span>
        </Link>

        <h1 className="auth-title">Forgot password?</h1>
        <p className="auth-subtitle">
          Enter your email and we'll send you a reset OTP.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="input-label" htmlFor="forgot-email">Email address</label>
            <div className="input-wrapper gradient-border">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="forgot-email"
                type="email"
                className={`input input-with-icon ${error ? 'error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoFocus
                autoComplete="email"
              />
            </div>
            {error && <span className="input-error-msg">⚠ {error}</span>}
          </div>

          <button
            id="forgot-submit"
            type="submit"
            className={`btn btn-primary btn-lg ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                Sending OTP…
              </>
            ) : (
              'Send Reset OTP'
            )}
          </button>
        </form>

        <p className="auth-footer">
          Remember your password?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}