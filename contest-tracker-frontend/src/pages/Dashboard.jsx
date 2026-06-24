// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { contestService } from '../services/contestService';
import { getInitials, formatRelative, getContestStatus, getPlatformInfo } from '../utils/formatters';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await contestService.getAll();
        setContests(data || []);
      } catch {
        setContests([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const upcoming = contests.filter(c => getContestStatus(c) === 'UPCOMING');
  const ongoing = contests.filter(c => getContestStatus(c) === 'ONGOING');
  const past = contests.filter(c => getContestStatus(c) === 'PAST');

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Welcome back, <strong style={{ color: 'var(--text-primary)' }}>{user?.email?.split('@')[0]}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/contests" className="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse Contests
            </Link>
            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="btn btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            iconBg="var(--info-light)"
            iconColor="var(--info)"
            value={loading ? '—' : upcoming.length}
            label="Upcoming"
            loading={loading}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>}
            iconBg="var(--success-light)"
            iconColor="var(--success)"
            value={loading ? '—' : ongoing.length}
            label="Live Now"
            loading={loading}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
            iconBg="var(--accent-light)"
            iconColor="var(--accent)"
            value={loading ? '—' : past.length}
            label="Past Contests"
            loading={loading}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
            iconBg="var(--warning-light)"
            iconColor="var(--warning)"
            value={loading ? '—' : contests.length}
            label="Total Contests"
            loading={loading}
          />
        </div>

        <div className="dashboard-grid">
          {/* Profile Card */}
          <div className="card card-lg">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Your Profile
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
              <div className="avatar avatar-xl">{getInitials(user?.email)}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.25rem' }}>{user?.email}</div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span className={`badge ${user?.role === 'ADMIN' ? 'badge-accent' : 'badge-info'}`}>{user?.role}</span>
                  <span className={`badge ${user?.verified ? 'badge-success' : 'badge-warning'}`}>
                    {user?.verified ? '✓ Verified' : '⚠ Unverified'}
                  </span>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ProfileRow label="Email" value={user?.email} />
              <ProfileRow label="Role" value={user?.role} />
              <ProfileRow label="Status" value={user?.verified ? 'Verified' : 'Pending verification'} valueColor={user?.verified ? 'var(--success)' : 'var(--warning)'} />
            </div>
            <div className="divider" />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/profile" className="btn btn-secondary" style={{ flex: 1 }}>
                View Profile
              </Link>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* Upcoming contests preview */}
          <div className="card card-lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Upcoming Contests
              </h2>
              <Link to="/contests" className="btn btn-ghost btn-sm">View all</Link>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1,2,3].map(i => (
                  <div key={i} className="skeleton" style={{ height: 64, borderRadius: 10 }} />
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <p className="empty-state-desc">No upcoming contests found</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcoming.slice(0, 5).map(contest => {
                  const { label, cls } = getPlatformInfo(contest.platform);
                  return (
                    <div key={contest.id} className="mini-contest-row">
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          {contest.title}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={`badge ${cls}`} style={{ fontSize: '0.7rem' }}>{label}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {formatRelative(contest.start)}
                          </span>
                        </div>
                      </div>
                      <a href={contest.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                        Register
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, iconColor, value, label, loading }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      {loading ? (
        <div className="skeleton" style={{ height: 32, width: 60, borderRadius: 6 }} />
      ) : (
        <div className="stat-value">{value}</div>
      )}
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ProfileRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: valueColor || 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}