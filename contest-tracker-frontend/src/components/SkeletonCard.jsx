// src/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="contest-card" style={{ cursor: 'default', pointerEvents: 'none' }}>
      <div className="contest-card-header">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="skeleton" style={{ width: 72, height: 22, borderRadius: 999 }} />
          <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 999 }} />
        </div>
        <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 8 }} />
      </div>
      <div className="skeleton" style={{ height: 20, marginBottom: '0.5rem', borderRadius: 6 }} />
      <div className="skeleton" style={{ height: 16, width: '60%', borderRadius: 6 }} />
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: '50%', borderRadius: 6 }} />
      </div>
      <div className="contest-card-footer">
        <div className="skeleton" style={{ height: 34, flex: 1, borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 34, width: 80, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="contests-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
