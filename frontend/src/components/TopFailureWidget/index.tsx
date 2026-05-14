import { useState } from 'react';
import { useTopFailures } from '../../hooks/useTopFailures';
import { SkeletonState } from './SkeletonState';
import { PopulatedState } from './PopulatedState';
import { EmptyState } from './EmptyState';
import './widget.css';

const SQL_QUERY = `SELECT
    c.customer_name,
    t.failure_category,
    COUNT(*)::INTEGER AS ticket_count
FROM tickets t
INNER JOIN customers c
    ON c.customer_id = t.customer_id
WHERE
    t.customer_id        = $1
    AND t.resolved       = FALSE
    AND t.failure_category IS NOT NULL
GROUP BY
    c.customer_name,
    t.failure_category
ORDER BY
    ticket_count DESC
LIMIT 3;`;

interface Props {
  customerId: number;
}

export function TopFailureWidget({ customerId }: Props) {
  const { data, customerName, loading, error, isEmpty, refetch } =
    useTopFailures(customerId);
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SQL_QUERY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderBody = () => {
    if (loading) return <SkeletonState />;
    if (error)
      return (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p className="error-msg">{error}</p>
          <button className="retry-btn" onClick={refetch}>
            Retry
          </button>
        </div>
      );
    if (isEmpty) return <EmptyState />;
    return <PopulatedState data={data} />;
  };

  return (
    <>
      <article className="widget" aria-label="Top failure categories widget">
        <header className="widget-header">
          <div className="widget-title-group">
            <span className="widget-title">Top Failure Categories</span>
            <span className="widget-customer">
              {loading
                ? 'Loading…'
                : customerName ?? `Customer #${customerId}`}
            </span>
          </div>
          {!loading && !error && (
            <span className="widget-badge">
              <span className="badge-dot" />
              {isEmpty ? 'All clear' : 'Unresolved'}
            </span>
          )}
        </header>

        {renderBody()}

        <footer className="widget-footer">
          <span className="footer-note">Showing unresolved tickets only</span>
          <button
            className="sql-btn"
            onClick={() => setShowSql(true)}
            aria-label="View SQL query"
            id="view-sql-btn"
          >
            <span>{'</>'}</span> View SQL
          </button>
        </footer>
      </article>

      {showSql && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="SQL Query"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSql(false);
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Raw SQL Query</h2>
              <button
                className="modal-close"
                onClick={() => setShowSql(false)}
                aria-label="Close"
                id="close-sql-modal"
              >
                ×
              </button>
            </div>
            <p className="modal-desc">
              Single optimised query — one JOIN, parameterised input, NULL
              filtered before aggregation, LIMIT pushed to the database.
            </p>
            <div className="sql-code-block">
              <pre>{SQL_QUERY}</pre>
            </div>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              id="copy-sql-btn"
            >
              {copied ? '✓ Copied!' : '⎘ Copy SQL'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
