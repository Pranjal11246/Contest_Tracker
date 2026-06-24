// src/components/ContestCard.jsx
import { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { formatDateTime, formatDuration, getPlatformInfo, getContestStatus } from '../utils/formatters';

function CountdownDisplay({ target }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target);
  if (isExpired) return <span className="badge badge-success">Started</span>;
  return (
    <div className="countdown">
      {days > 0 && (
        <>
          <div className="countdown-unit">
            <span className="countdown-value">{String(days).padStart(2, '0')}</span>
            <span className="countdown-label">d</span>
          </div>
          <span className="countdown-sep">:</span>
        </>
      )}
      <div className="countdown-unit">
        <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
        <span className="countdown-label">h</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
        <span className="countdown-label">m</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-value">{String(seconds).padStart(2, '0')}</span>
        <span className="countdown-label">s</span>
      </div>
    </div>
  );
}

export default function ContestCard({ contest, onOpenModal }) {
  const [bookmarked, setBookmarked] = useState(false);
  const status = getContestStatus(contest);
  const { label, cls } = getPlatformInfo(contest.platform);

  const statusInfo = {
    UPCOMING: { cls: 'badge-info', label: 'Upcoming' },
    ONGOING: { cls: 'badge-success', label: 'Live Now' },
    PAST: { cls: 'badge-muted', label: 'Ended' },
  }[status] || { cls: 'badge-muted', label: status };

  return (
    <div className="contest-card" onClick={() => onOpenModal?.(contest)}>
      {/* Header */}
      <div className="contest-card-header">
        <div className="contest-card-badges">
          <span className={`badge ${cls}`}>{label}</span>
          <span className={`badge ${statusInfo.cls}`}>
            {status === 'ONGOING' && (
              <span className="live-dot" />
            )}
            {statusInfo.label}
          </span>
        </div>
        <button
          className={`btn btn-ghost btn-icon bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
          onClick={(e) => { e.stopPropagation(); setBookmarked(b => !b); }}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark contest'}
          title={bookmarked ? 'Bookmarked' : 'Bookmark'}
        >
          <svg viewBox="0 0 24 24" fill={bookmarked ? 'var(--accent)' : 'none'} width="16" height="16" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h3 className="contest-card-title">{contest.title}</h3>

      {/* Info rows */}
      <div className="contest-card-info">
        <div className="contest-info-row">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2" className="info-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{formatDateTime(contest.start)}</span>
        </div>
        <div className="contest-info-row">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2" className="info-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{formatDuration(contest.duration)}</span>
        </div>
      </div>

      {/* Countdown */}
      {status === 'UPCOMING' && (
        <div className="contest-card-countdown">
          <span className="countdown-label-text">Starts in</span>
          <CountdownDisplay target={contest.start} />
        </div>
      )}
      {status === 'ONGOING' && (
        <div className="contest-card-countdown">
          <span className="countdown-label-text">Ends in</span>
          <CountdownDisplay target={contest.end} />
        </div>
      )}

      {/* Footer */}
      <div className="contest-card-footer">
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {status === 'PAST' ? 'View Results' : 'Register Now'}
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => { e.stopPropagation(); onOpenModal?.(contest); }}
        >
          Details
        </button>
      </div>
    </div>
  );
}
