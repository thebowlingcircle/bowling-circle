import LegalLayout from '../components/LegalLayout';
import useMeta from '../lib/useMeta';

const p       = { color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 };
const caption = { fontSize: 13, color: 'var(--text-faint)', marginTop: 5, lineHeight: 1.5, marginBottom: 0 };
const link    = { color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' };

function ContactRow({ icon, label, href, linkText, captionText, newTab, last }) {
  return (
    <div style={{
      display: 'flex', gap: 16, alignItems: 'flex-start',
      padding: '16px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 22, lineHeight: 1, paddingTop: 3, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <a href={href} style={link} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {linkText}
        </a>
        <p style={caption}>{captionText}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  useMeta(
    'Contact Us | The Bowling Circle Pune',
    'Get in touch with The Bowling Circle — questions about sessions, venues, or how it works. Reach us by email, Instagram, or WhatsApp.'
  );

  return (
    <LegalLayout title="Contact Us">
      <p style={p}>
        Have a question before signing up, or need help with something after? Reach out — we're a
        small, hands-on team and read every message.
      </p>

      <ContactRow
        icon="✉️"
        label="Email"
        href="mailto:thebowlingcircle@gmail.com"
        linkText="thebowlingcircle@gmail.com"
        captionText="Best for detailed questions, data requests, or anything related to our Privacy Policy or Terms of Service."
      />
      <ContactRow
        icon="📷"
        label="Instagram"
        href="https://instagram.com/thebowlingcirclee"
        linkText="@thebowlingcirclee"
        captionText="Follow us for session updates, photos from past meetups, and giveaway announcements."
        newTab
      />
      <ContactRow
        icon="💬"
        label="WhatsApp"
        href="https://wa.me/917666821398"
        linkText="+91 76668 21398"
        captionText="Fastest way to reach us for quick questions about an upcoming session."
        newTab
        last
      />
    </LegalLayout>
  );
}
