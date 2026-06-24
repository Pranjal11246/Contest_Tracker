// src/pages/VerifyOtp.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

export default function VerifyOtp() {
  const { verifyOtp, resendOtp, pendingEmail } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleChange = (index, value) => {
    // Accept only single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError('');
    // Move focus forward
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const next = [...otp];
      next[index] = '';
      setOtp(next);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    if (!pendingEmail) {
      setError('Email not found. Please register again.');
      return;
    }
    setLoading(true);
    try {
      const msg = await verifyOtp({ email: pendingEmail, otp: code });
      toast.success(msg || 'Email verified! You can now log in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data || 'Invalid or expired OTP.';
      setError(typeof msg === 'string' ? msg : 'Verification failed');
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) { toast.error('Email not found. Please register again.'); return; }
    setResending(true);
    try {
      const msg = await resendOtp(pendingEmail);
      toast.success(msg || 'OTP resent! Check your inbox.');
      setOtp(Array(OTP_LENGTH).fill(''));
      setError('');
      setCooldown(RESEND_COOLDOWN);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const codeComplete = otp.every(d => d !== '');

  return (
    <div className="auth-page">
      <div className="mesh-bg" />
      <div className="auth-card fade-in" style={{ maxWidth: 460, textAlign: 'center' }}>
        <Link to="/" className="auth-logo" style={{ justifyContent: 'center' }}>
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="auth-logo-text">ContestTracker</span>
        </Link>

        {/* Email icon */}
        <div style={{
          width: 64, height: 64,
          background: 'var(--accent-light)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="var(--accent)" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <h1 className="auth-title" style={{ textAlign: 'center' }}>Verify your email</h1>
        <p className="auth-subtitle" style={{ textAlign: 'center' }}>
          We sent a 6-digit code to<br />
          <strong style={{ color: 'var(--text-primary)' }}>{pendingEmail || 'your email'}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-container" onPaste={handlePaste} style={{ margin: '1.5rem 0' }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputRefs.current[i] = el}
                id={`otp-input-${i}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className={`otp-input ${digit ? 'filled' : ''}`}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {error && (
            <div className="alert alert-error" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              ⚠ {error}
            </div>
          )}

          <button
            id="verify-submit"
            type="submit"
            className={`btn btn-primary btn-lg ${loading ? 'btn-loading' : ''}`}
            disabled={loading || !codeComplete}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                Verifying…
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Didn't receive the code?{' '}
          {cooldown > 0 ? (
            <span style={{ color: 'var(--text-muted)' }}>
              Resend in <strong style={{ color: 'var(--accent)' }}>{cooldown}s</strong>
            </span>
          ) : (
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleResend}
              disabled={resending}
              style={{ padding: '0.125rem 0.375rem' }}
            >
              {resending ? 'Resending…' : 'Resend OTP'}
            </button>
          )}
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <Link to="/register" style={{ color: 'var(--accent)' }}>← Back to register</Link>
        </p>
      </div>
    </div>
  );
}