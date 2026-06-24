// src/pages/Contests.jsx
import { useState, useEffect, useMemo } from 'react';
import { contestService } from '../services/contestService';
import ContestCard from '../components/ContestCard';
import ContestModal from '../components/ContestModal';
import { SkeletonGrid } from '../components/SkeletonCard';
import { getContestStatus, getPlatformInfo } from '../utils/formatters';
import { useDebounce } from '../hooks/useDebounce';

const PLATFORMS = ['All', 'Codeforces', 'LeetCode', 'CodeChef', 'AtCoder', 'HackerRank', 'TopCoder'];
const STATUSES = ['All', 'UPCOMING', 'ONGOING', 'PAST'];
const SORTS = [
  { value: 'start-asc', label: 'Start Time (Earliest)' },
  { value: 'start-desc', label: 'Start Time (Latest)' },
  { value: 'duration-asc', label: 'Duration (Shortest)' },
  { value: 'duration-desc', label: 'Duration (Longest)' },
  { value: 'title-asc', label: 'Title A–Z' },
];

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('start-asc');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await contestService.getAll();
        setContests(data || []);
      } catch {
        setError('Failed to load contests. Showing sample data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let items = [...contests];

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      items = items.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.platform?.toLowerCase().includes(q)
      );
    }

    // Platform filter
    if (platform !== 'All') {
      items = items.filter(c =>
        c.platform?.toLowerCase() === platform.toLowerCase()
      );
    }

    // Status filter
    if (status !== 'All') {
      items = items.filter(c => getContestStatus(c) === status);
    }

    // Sort
    items.sort((a, b) => {
      switch (sort) {
        case 'start-asc':
          return new Date(a.start) - new Date(b.start);
        case 'start-desc':
          return new Date(b.start) - new Date(a.start);
        case 'duration-asc':
          return (a.duration || 0) - (b.duration || 0);
        case 'duration-desc':
          return (b.duration || 0) - (a.duration || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return items;
  }, [contests, debouncedSearch, platform, status, sort]);

  const upcomingCount = contests.filter(c => getContestStatus(c) === 'UPCOMING').length;
  const ongoingCount = contests.filter(c => getContestStatus(c) === 'ONGOING').length;

  return (
    <div className="contests-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Contests</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {loading ? 'Loading…' : (
                <>
                  <span className="badge badge-info" style={{ marginRight: '0.5rem' }}>{upcomingCount} upcoming</span>
                  {ongoingCount > 0 && (
                    <span className="badge badge-success">{ongoingCount} live now</span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            {error}
          </div>
        )}

        {/* Filters bar */}
        <div className="filters-bar">
          {/* Search */}
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="contest-search"
              type="search"
              className="search-input"
              placeholder="Search contests…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filters-controls">
            {/* Platform */}
            <select
              id="platform-filter"
              className="select"
              value={platform}
              onChange={e => setPlatform(e.target.value)}
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Status */}
            <select
              id="status-filter"
              className="select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              id="sort-filter"
              className="select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORTS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Platform quick filters */}
        <div className="platform-chips">
          {PLATFORMS.map(p => {
            const info = p === 'All' ? { label: 'All Platforms', cls: 'badge-muted' } : getPlatformInfo(p);
            const active = platform === p;
            return (
              <button
                key={p}
                className={`badge ${info.cls}`}
                onClick={() => setPlatform(p)}
                style={{
                  cursor: 'pointer',
                  border: active ? '2px solid currentColor' : '1px solid rgba(255,255,255,0.1)',
                  opacity: active ? 1 : 0.7,
                  transition: 'all 0.15s',
                  fontSize: '0.8rem',
                  padding: '0.3125rem 0.75rem',
                }}
              >
                {p === 'All' ? 'All Platforms' : p}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {!loading && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {filtered.length} contest{filtered.length !== 1 ? 's' : ''} found
            {debouncedSearch && ` for "${debouncedSearch}"`}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" width="32" height="32" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 className="empty-state-title">No contests found</h3>
            <p className="empty-state-desc">Try adjusting your search or filter criteria.</p>
            <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setPlatform('All'); setStatus('All'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="contests-grid">
            {filtered.map(contest => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onOpenModal={setSelectedContest}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedContest && (
        <ContestModal
          contest={selectedContest}
          onClose={() => setSelectedContest(null)}
        />
      )}
    </div>
  );
}
