import LegalLayout from '../components/LegalLayout';

const CONTACT = 'thebowlingcircle@gmail.com';
const h3 = { fontSize: 17, marginTop: 24, marginBottom: 8 };
const p = { color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 };
const ul = { color: 'var(--text-muted)', margin: '0 0 12px 20px', lineHeight: 1.6 };
const mail = <a href={`mailto:${CONTACT}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{CONTACT}</a>;

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="12th August 2026">
      <p style={p}>
        The Bowling Circle ("we," "us," "the platform") is an admin-operated social meetup service
        based in Pune, India. This policy explains what information we collect and how we use it.
      </p>

      <h3 style={h3}>What we collect</h3>
      <p style={p}>
        When you submit our intake form, we collect: your name, age, gender, WhatsApp number, email
        address, chosen venue, availability, group size preference, bio, and — optionally — your
        Instagram handle. If you create an account, we also store your password (encrypted) and, if
        set, a secret word used for password recovery. If you opt in, we store your preference to
        receive marketing emails about giveaways and events.
      </p>

      <h3 style={h3}>Why we collect it</h3>
      <ul style={ul}>
        <li>Name, age, gender, availability, and bio are used to manually match you into a compatible bowling group.</li>
        <li>WhatsApp number and email are used to contact you about your session and, if relevant, to organize your group.</li>
        <li>Instagram handle is collected only if you choose to enter our giveaways, and is used solely to verify and contact winners.</li>
        <li>Marketing email opt-in is used only to send you updates about giveaways and events — nothing else.</li>
      </ul>

      <h3 style={h3}>Who sees it</h3>
      <p style={p}>
        Your information is visible only to the admin(s) of The Bowling Circle. We do not sell your
        data, and we do not share it with any third party, advertiser, or outside company. When
        you're matched into a session, only your name and WhatsApp number are shared with the other
        members of that specific session, so the group can coordinate.
      </p>

      <h3 style={h3}>How long we keep it</h3>
      <p style={p}>
        We do not automatically delete or expire your data on any set schedule. We keep it for as
        long as your profile exists on the platform. If you want your data deleted, contact us at{' '}
        {mail} and we will remove it. We aim to process deletion requests within 7-14 working days.
      </p>

      <h3 style={h3}>Payments</h3>
      <p style={p}>
        All payments for sessions are processed and handled directly by The Bowling Circle. Payment
        is collected via UPI, typically by scanning a QR code shared with you after you're matched
        into a session. We do not store any of your sensitive payment or billing details — no card
        numbers, bank account details, or UPI PIN ever pass through or get stored on our servers. We
        may keep a basic record that a payment was made (amount, date, session) for our own
        accounting.
      </p>

      <h3 style={h3}>Age requirement</h3>
      <p style={p}>
        The Bowling Circle is only for participants 18 years of age or older. We do not knowingly
        collect data from anyone under 18.
      </p>

      <h3 style={h3}>Your rights</h3>
      <p style={p}>
        You can ask us, at any time, to: tell you what data we have about you, correct it, or delete
        it. Contact {mail} for any of these requests.
      </p>

      <h3 style={h3}>Changes to this policy</h3>
      <p style={{ ...p, marginBottom: 0 }}>
        If this policy changes, we'll update the date at the top of this page.
      </p>
    </LegalLayout>
  );
}
