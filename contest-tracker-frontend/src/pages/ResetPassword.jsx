// src/pages/ResetPassword.jsx
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const OTP_LENGTH = 6;

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
      const next = [...otp]; next[index] = ''; setOtp(next);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email is required';
    if (otp.join('').length < OTP_LENGTH) e.otp = 'Enter the complete 6-digit OTP';
    if (!newPassword) e.newPassword = 'New password is required';
    else if (newPassword.length < 6) e.newPassword = 'Must be at least 6 characters';
    if (!confirmPassword) e.confirmPassword = 'Confirm your new password';
    else if (newPassword !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const msg = await resetPassword({ email, otp: otp.join(''), newPassword });
      toast.success(msg || 'Password reset successfully!');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data || 'Reset failed';
      toast.error(typeof msg === 'string' ? msg : 'Failed to reset password');
      setErrors(prev => ({ ...prev, otp: typeof msg === 'string' ? msg : 'Invalid OTP or expired' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="mesh-bg" />
      <div className="auth-card fade-in" style={{ maxWidth: 460 }}>
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

        <h1 className="auth-title">Reset password</h1>
        <p className="auth-subtitle">Enter your OTP and choose a new password</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          {!location.state?.email && (
            <div className="input-group">
              <label className="input-label" htmlFor="reset-email">Email</label>
              <div className="input-wrapper gradient-border">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="reset-email"
                  type="email"
                  className={`input input-with-icon ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(ev => ({ ...ev, email: '' })); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="input-error-msg">⚠ {errors.email}</span>}
            </div>
          )}

          {/* OTP */}
          <div className="input-group">
            <label className="input-label">OTP Code</label>
            <div className="otp-container" onPaste={handleOtpPaste} style={{ justifyContent: 'flex-start' }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  id={`reset-otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className={`otp-input ${digit ? 'filled' : ''} ${errors.otp ? 'error' : ''}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                  style={{ width: '2.75rem', height: '3.25rem', fontSize: '1.25rem' }}
                />
              ))}
            </div>
            {errors.otp && <span className="input-error-msg">⚠ {errors.otp}</span>}
          </div>

          {/* New Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="reset-new-password">New Password</label>
            <div className="input-wrapper gradient-border">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="reset-new-password"
                type={showNew ? 'text' : 'password'}
                className={`input input-with-icon ${errors.newPassword ? 'error' : ''}`}
                placeholder="New password (min 6 chars)"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors(ev => ({ ...ev, newPassword: '' })); }}
                autoComplete="new-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button type="button" className="input-toggle" onClick={() => setShowNew(s => !s)}>
                {showNew ? (
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && <span className="input-error-msg">⚠ {errors.newPassword}</span>}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="reset-confirm-password">Confirm Password</label>
            <div className="input-wrapper gradient-border">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <input
                id="reset-confirm-password"
                type={showConfirm ? 'text' : 'password'}
                className={`input input-with-icon ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(ev => ({ ...ev, confirmPassword: '' })); }}
                autoComplete="new-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button type="button" className="input-toggle" onClick={() => setShowConfirm(s => !s)}>
                {showConfirm ? (
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <span className="input-error-msg">⚠ {errors.confirmPassword}</span>}
          </div>

          <button
            id="reset-submit"
            type="submit"
            className={`btn btn-primary btn-lg ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                Resetting…
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/forgot-password" style={{ color: 'var(--accent)' }}>← Request new OTP</Link>
        </p>
      </div>
    </div>
  );
}