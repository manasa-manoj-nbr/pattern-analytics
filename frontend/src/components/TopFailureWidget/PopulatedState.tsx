import type { FailureCategory } from '../../types';

interface Props {
  data: FailureCategory[];
}

const RANK_LABELS = ['#1', '#2', '#3'];
const RANK_CLASSES = ['rank-1', 'rank-2', 'rank-3'];

export function PopulatedState({ data }: Props) {
  const maxCount = Math.max(...data.map((d) => d.ticket_count));

  return (
    <ul className="failure-list" aria-label="Top failure categories">
      {data.map((item, index) => {
        const pct = Math.round((item.ticket_count / maxCount) * 100);
        const barWidth = Math.max(pct, 12);

        return (
          <li className="failure-item" key={item.failure_category}>
            <div className="failure-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="failure-rank">{RANK_LABELS[index]}</span>
                <span className="failure-category-name">
                  {item.failure_category}
                </span>
              </div>
              <span className="failure-count-badge">
                {item.ticket_count} ticket{item.ticket_count !== 1 ? 's' : ''}
              </span>
            </div>
            <div
              className="bar-track"
              role="progressbar"
              aria-valuenow={item.ticket_count}
              aria-valuemin={0}
              aria-valuemax={maxCount}
              aria-label={`${item.failure_category}: ${item.ticket_count} tickets`}
            >
              <div
                className={`bar-fill ${RANK_CLASSES[index]}`}
                style={{ width: `${barWidth}%` }}
              >
                {barWidth > 25 && `${item.ticket_count}`}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
