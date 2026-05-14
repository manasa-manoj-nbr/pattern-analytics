import { useState, useEffect } from 'react';
import { TopFailureWidget } from './components/TopFailureWidget';
import { CustomerSelector } from './components/CustomerSelector';
import './index.css';

type Theme = 'dark' | 'light';

function App() {
  const [customerId, setCustomerId] = useState<number>(1);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app">
      <nav className="topbar" role="navigation">
        <div className="topbar-brand">
          <div className="brand-icon" aria-hidden="true">📊</div>
          <span className="brand-name">SupportIQ</span>
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          id="theme-toggle-btn"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      <main className="main">
        <div className="page-heading">
          <h1>Top Failure Patterns</h1>
          <p>
            Surface the most common unresolved failure categories per customer
            so account managers can act before churn.
          </p>
        </div>

        <CustomerSelector
          selectedId={customerId}
          onChange={setCustomerId}
        />

        <TopFailureWidget key={customerId} customerId={customerId} />
      </main>

      <footer className="footer">
        Top Failure Patterns Analytics &nbsp;·&nbsp; Built with React + TypeScript + Express + PostgreSQL
      </footer>
    </div>
  );
}

export default App;
