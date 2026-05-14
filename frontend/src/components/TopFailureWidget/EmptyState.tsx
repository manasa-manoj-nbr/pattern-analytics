export function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-label="No failure patterns detected">
      <div className="empty-icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p className="empty-title">No failure patterns detected</p>
      <p className="empty-subtitle">
        This customer is in great shape — all tickets are resolved and
        no recurring issues found.
      </p>
    </div>
  );
}
