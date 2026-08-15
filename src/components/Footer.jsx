import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        className={`scroll-top-btn${visible ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '18px 16px',
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--text-faint)',
      }}>
        <span>© {new Date().getFullYear()} The Bowling Circle · Pune, India</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
        <span style={{ margin: '0 8px' }}>·</span>
        <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
      </footer>
    </>
  );
}
