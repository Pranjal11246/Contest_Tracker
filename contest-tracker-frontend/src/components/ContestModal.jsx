// src/components/ContestModal.jsx
import { useEffect } from 'react';
import { formatDateTime, formatDuration, getPlatformInfo, getContestStatus } from '../utils/formatters';

export default function ContestModal({ contest, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!contest) return null;

  const { label, cls } = getPlatformInfo(contest.platform);
  const status = getContestStatus(contest);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className={`badge ${cls}`}>{label}</span>
              <span className={`badge ${status === 'ONGOING' ? 'badge-success' : status === 'UPCOMING' ? 'badge-info' : 'badge-muted'}`}>
                {status}
              </span>
            </div>
            <h2 className="modal-title">{contest.title}</h2>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="contest-modal-grid">
            <div className="contest-modal-row">
              <span className="contest-modal-label">Start Time</span>
              <span className="contest-modal-value">{formatDateTime(contest.start)}</span>
            </div>
            <div className="contest-modal-row">
              <span className="contest-modal-label">End Time</span>
              <span className="contest-modal-value">{formatDateTime(contest.end)}</span>
            </div>
            <div className="contest-modal-row">
              <span className="contest-modal-label">Duration</span>
              <span className="contest-modal-value">{formatDuration(contest.duration)}</span>
            </div>
            <div className="contest-modal-row">
              <span className="contest-modal-label">Platform</span>
              <span className={`badge ${cls}`}>{label}</span>
            </div>
            <div className="contest-modal-row">
              <span className="contest-modal-label">Status</span>
              <span className={`badge ${status === 'ONGOING' ? 'badge-success' : status === 'UPCOMING' ? 'badge-info' : 'badge-muted'}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {status === 'PAST' ? 'View Results' : 'Register Now'}
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
