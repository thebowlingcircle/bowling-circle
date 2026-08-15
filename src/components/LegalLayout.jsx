import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

// Shared layout for the Privacy Policy and Terms of Service pages.
// Reuses existing page/typography classes (.hero, .card, .section-title).
export default function LegalLayout({ title, updated, children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '24px 16px 48px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/"><Logo height={44} /></Link>
          <ThemeToggle />
        </div>

        <div className="hero">
          <h1>{title}</h1>
          {updated && <p>Last updated: {updated}</p>}
        </div>

        <div className="card">
          {children}
        </div>
      </div>
    </div>
  );
}
