export function SkeletonState() {
  return (
    <div className="skeleton-list" aria-label="Loading failure categories…" role="status">
      {[70, 50, 35].map((width, i) => (
        <div className="skeleton-item" key={i}>
          <div
            className="skeleton-label"
            style={{ width: `${width}%` }}
          />
          <div className="skeleton-bar" />
        </div>
      ))}
    </div>
  );
}
