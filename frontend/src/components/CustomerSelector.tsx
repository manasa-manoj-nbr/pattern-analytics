import type { Customer } from '../types';

export const DEMO_CUSTOMERS: Customer[] = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'Bright Labs' },
  { id: 3, name: 'ZenFlow' },
  { id: 4, name: 'NullCo' },
  { id: 5, name: 'Titan Systems' },
];

interface Props {
  selectedId: number;
  onChange: (id: number) => void;
}

export function CustomerSelector({ selectedId, onChange }: Props) {
  return (
    <div className="selector-wrapper">
      <label className="selector-label" htmlFor="customer-select">
        Switch Customer
      </label>
      <select
        id="customer-select"
        className="selector"
        value={selectedId}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Select customer to view failure patterns"
      >
        {DEMO_CUSTOMERS.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <p className="selector-hint">
        Tip: ZenFlow &amp; NullCo → empty state &nbsp;|&nbsp; Acme Corp → populated
      </p>
    </div>
  );
}
