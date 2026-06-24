// src/pages/Admin.jsx
// Admin dashboard — uses mock data since no admin endpoints exist in backend yet
import { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Mock Data ---
const mockUsers = [
  { id: '1', email: 'admin@contesttracker.dev', role: 'ADMIN', verified: true, createdAt: '2026-01-10' },
  { id: '2', email: 'alice@example.com', role: 'USER', verified: true, createdAt: '2026-05-15' },
  { id: '3', email: 'bob@example.com', role: 'USER', verified: false, createdAt: '2026-06-01' },
  { id: '4', email: 'charlie@dev.io', role: 'USER', verified: true, createdAt: '2026-06-10' },
  { id: '5', email: 'diana@college.edu', role: 'USER', verified: true, createdAt: '2026-06-18' },
  { id: '6', email: 'eve@contests.com', role: 'USER', verified: false, createdAt: '2026-06-22' },
];

const stats = [
  { label: 'Total Users', value: mockUsers.length, icon: '👥', color: 'var(--info)', bg: 'var(--info-light)' },
  { label: 'Verified Users', value: mockUsers.filter(u => u.verified).length, icon: '✅', color: 'var(--success)', bg: 'var(--success-light)' },
  { label: 'Pending Verification', value: mockUsers.filter(u => !u.verified).length, icon: '⏳', color: 'var(--warning)', bg: 'var(--warning-light)' },
  { label: 'Admins', value: mockUsers.filter(u => u.role === 'ADMIN').length, icon: '🛡', color: 'var(--accent)', bg: 'var(--accent-light)' },
];

export default function Admin() {
  const [search, setSearch] = useState('');

  const filtered = mockUsers.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Dashboard</h1>
            <span className="badge badge-accent">Demo Data</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage users and monitor platform activity.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/dashboard" className="btn btn-secondary btn-sm">
            ← Dashboard
          </Link>
          <Link to="/contests" className="btn btn-primary btn-sm">
            View Contests
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {stats.map(({ label, value, icon, color, bg }) => (
          <div key={label} className="stat-card">
            <div className="stat-icon" style={{ background: bg, color, fontSize: '1.25rem' }}>
              {icon}
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row (visual bars) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Verification rate */}
        <div className="card">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1.25rem' }}>Verification Rate</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <ProgressRow
              label="Verified"
              value={mockUsers.filter(u => u.verified).length}
              total={mockUsers.length}
              color="var(--success)"
            />
            <ProgressRow
              label="Unverified"
              value={mockUsers.filter(u => !u.verified).length}
              total={mockUsers.length}
              color="var(--warning)"
            />
          </div>
        </div>

        {/* Role breakdown */}
        <div className="card">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1.25rem' }}>Role Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <ProgressRow
              label="Users"
              value={mockUsers.filter(u => u.role === 'USER').length}
              total={mockUsers.length}
              color="var(--info)"
            />
            <ProgressRow
              label="Admins"
              value={mockUsers.filter(u => u.role === 'ADMIN').length}
              total={mockUsers.length}
              color="var(--accent)"
            />
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>All Users</h2>
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="admin-user-search"
              type="search"
              className="search-input"
              placeholder="Search users…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No users found
                  </td>
                </tr>
              ) : filtered.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    {index + 1}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="avatar avatar-sm">{user.email[0].toUpperCase()}</div>
                      <span style={{ fontWeight: 500 }}>{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-accent' : 'badge-muted'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${user.verified ? 'badge-success' : 'badge-warning'}`}>
                      {user.verified ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user.createdAt}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem' }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ label, value, total, color }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 600, color }}>{value} ({pct}%)</span>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
