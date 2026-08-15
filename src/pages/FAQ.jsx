import { useState } from 'react';
import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout';
import useMeta from '../lib/useMeta';

const aStyle = { color: 'var(--primary)', fontWeight: 700 };

export default function FAQ() {
  useMeta(
    'FAQ | The Bowling Circle Pune',
    'Frequently asked questions about The Bowling Circle — how sessions work, pricing, payment, matching, and more.'
  );

  const FAQS = [
    {
      q: 'What is The Bowling Circle?',
      a: 'The Bowling Circle is a Pune-based platform that pairs strangers into small bowling groups for social meetups. You fill out a short form, and our admin manually matches you into an upcoming session with a small group of other people.',
    },
    {
      q: 'How does matching work?',
      a: "Matching is done manually, not by an algorithm. Our admin reviews submissions and groups people based on availability, group size preference, and other details from your form. This isn't a dating app — groups are mixed and matching isn't romantic in intent.",
    },
    {
      q: 'Do I need to create an account?',
      a: 'No. You can fill out the intake form as a guest without signing up. Creating an account just saves your details so the form pre-fills the next time you submit.',
    },
    {
      q: 'Where do sessions happen?',
      a: "Currently, sessions run at The Game Palacio Pune - The Mills, Sangamwadi. We're planning to add more venues in Pune as we grow.",
    },
    {
      q: 'When do sessions run?',
      a: 'Sessions currently run weekly, with afternoon and night slots available.',
    },
    {
      q: 'How much does it cost?',
      a: 'Pricing depends on the time slot — currently ₹600 for afternoon sessions and ₹850 for night sessions. Pricing is shown on the intake form when you select a time slot.',
    },
    {
      q: 'How do I pay?',
      a: "Payment is handled directly by The Bowling Circle via UPI. Once you're matched into a session, we'll share a QR code or UPI ID for payment.",
    },
    {
      q: 'Can I get a refund if I cancel?',
      a: (
        <span>
          No. Once a payment is made, it's final — we don't offer refunds or cancellations after
          payment, since we've already committed your spot to the venue. If we cancel a session on our
          end, you'll receive a full refund. See our{' '}
          <Link to="/terms-of-service" style={aStyle}>Terms of Service</Link> for full details.
        </span>
      ),
    },
    {
      q: 'Is there an age requirement?',
      a: 'Yes, you must be 18 or older to participate.',
    },
    {
      q: 'Do I need to add my Instagram handle?',
      a: "No, it's optional — unless you want to be eligible for our giveaways, in which case an Instagram handle is required.",
    },
    {
      q: 'Will I receive marketing emails?',
      a: 'Only if you opt in on the intake form. We only send emails about giveaways and events — nothing else.',
    },
    {
      q: 'Is my data safe?',
      a: (
        <span>
          We don't sell your data or share it with third parties. See our full{' '}
          <Link to="/privacy-policy" style={aStyle}>Privacy Policy</Link> for details on what we
          collect and why.
        </span>
      ),
    },
    {
      q: 'How do I get in touch?',
      a: (
        <span>
          See our <Link to="/contact" style={aStyle}>Contact Us</Link> page for email, Instagram, and
          WhatsApp.
        </span>
      ),
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <LegalLayout title="FAQ">
      {FAQS.map((item, i) => (
        <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              padding: '14px 0',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>{item.q}</span>
            <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--primary)', flexShrink: 0, lineHeight: 1 }}>
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, paddingBottom: 14, marginBottom: 0 }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </LegalLayout>
  );
}
