import { Link } from 'react-router-dom';

// Small, unobtrusive footer shown on every page.
export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '18px 16px',
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--text-faint)',
    }}>
      <span>© {new Date().getFullYear()} The Bowling Circle · Pune, India</span>
      <span style={{ margin: '0 8px' }}>·</span>
      <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700 }}>Privacy Policy</Link>
      <span style={{ margin: '0 8px' }}>·</span>
      <Link to="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700 }}>Terms of Service</Link>
    </footer>
  );
}
