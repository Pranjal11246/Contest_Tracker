// src/utils/formatters.js

/**
 * Format a duration in minutes to "Xh Ym"
 */
export function formatDuration(minutes) {
  if (!minutes) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Format an ISO date string to human-readable date+time
 */
export function formatDateTime(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso));
}

/**
 * Format date only
 */
export function formatDate(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

/**
 * Relative time — "2 hours ago", "in 3 days"
 */
export function formatRelative(iso) {
  if (!iso) return '—';
  const diff = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (abs < 60000) return rtf.format(Math.round(diff / 1000), 'second');
  if (abs < 3600000) return rtf.format(Math.round(diff / 60000), 'minute');
  if (abs < 86400000) return rtf.format(Math.round(diff / 3600000), 'hour');
  return rtf.format(Math.round(diff / 86400000), 'day');
}

/**
 * Get initials from email
 */
export function getInitials(email) {
  if (!email) return '?';
  const parts = email.split('@')[0].split(/[._-]/);
  return parts
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .filter(Boolean)
    .join('') || email[0].toUpperCase();
}

/**
 * Determine contest status based on start/end times
 */
export function getContestStatus(contest) {
  if (contest.status) return contest.status.toUpperCase();
  const now = Date.now();
  const start = new Date(contest.start).getTime();
  const end = new Date(contest.end).getTime();
  if (now < start) return 'UPCOMING';
  if (now > end) return 'PAST';
  return 'ONGOING';
}

/**
 * Normalize platform name to a CSS-friendly slug
 */
export function platformSlug(platform = '') {
  return platform.toLowerCase().replace(/[^a-z]/g, '');
}

/**
 * Get platform display info (color class + label)
 */
export function getPlatformInfo(platform = '') {
  const slug = platformSlug(platform);
  const map = {
    codeforces: { label: 'Codeforces', cls: 'badge-codeforces' },
    leetcode: { label: 'LeetCode', cls: 'badge-leetcode' },
    codechef: { label: 'CodeChef', cls: 'badge-codechef' },
    atcoder: { label: 'AtCoder', cls: 'badge-atcoder' },
    hackerrank: { label: 'HackerRank', cls: 'badge-hackerrank' },
    topcoder: { label: 'TopCoder', cls: 'badge-topcoder' },
  };
  return map[slug] || { label: platform || 'Other', cls: 'badge-other' };
}
