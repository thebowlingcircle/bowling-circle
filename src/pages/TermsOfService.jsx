import LegalLayout from '../components/LegalLayout';

const CONTACT = 'thebowlingcircle@gmail.com';
const h3 = { fontSize: 17, marginTop: 24, marginBottom: 8 };
const p = { color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 };
const mail = <a href={`mailto:${CONTACT}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{CONTACT}</a>;

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" updated="12th August 2026">
      <p style={p}>
        By submitting the intake form or attending a session, you agree to these terms.
      </p>

      <h3 style={h3}>1. What The Bowling Circle is</h3>
      <p style={p}>
        We are an admin-curated matching service. A real person reviews submissions and manually
        places you into a small group for a bowling session at a partner venue. We are not a
        marketplace, not a dating app, and matching is not automated.
      </p>

      <h3 style={h3}>2. Eligibility</h3>
      <p style={p}>
        You must be at least 18 years old to submit the form or participate in a session. We may
        decline or remove a submission if we have concerns about eligibility.
      </p>

      <h3 style={h3}>3. No guarantee of matching or compatibility</h3>
      <p style={p}>
        Submitting the form does not guarantee you will be placed into a session, and we do not
        guarantee compatibility, attendance, or conduct of other participants. We do our best to make
        good matches but cannot control how a session actually goes.
      </p>

      <h3 style={h3}>4. Payment</h3>
      <p style={p}>
        All payments for sessions are processed and handled directly by The Bowling Circle, not by
        the venue. Once you're matched into a session, you'll be asked to pay via UPI to a QR code or
        UPI ID we provide. We do not store your sensitive payment or billing details. Prices shown on
        the platform reflect what you pay us for the session, not necessarily the venue's own walk-in
        rate.
      </p>

      <h3 style={h3}>4a. Cancellations and Refunds</h3>
      <p style={p}>
        All payments are final. Once you've paid for a session, that payment is non-refundable and
        your spot cannot be cancelled, for any reason, including but not limited to change of plans,
        scheduling conflicts, or not attending.
      </p>
      <p style={p}>
        If The Bowling Circle cancels a session on our end (for example, not enough participants, or
        a venue issue), you will receive a full refund.
      </p>
      <p style={p}>
        By paying for a session, you acknowledge and accept this no-refund, no-cancellation policy.
      </p>

      <h3 style={h3}>6. Conduct</h3>
      <p style={p}>
        Participants are expected to treat each other respectfully. We reserve the right to remove any
        user from the platform, decline to include them in future sessions, or cancel a session, at
        our discretion, for any conduct we consider inappropriate, unsafe, or disruptive.
      </p>

      <h3 style={h3}>7. Liability</h3>
      <p style={p}>
        The Bowling Circle facilitates introductions and session logistics. We are not liable for any
        incident, injury, dispute, or loss that occurs between participants or at the venue, before,
        during, or after a session. Attendance is at your own risk.
      </p>

      <h3 style={h3}>8. Giveaways</h3>
      <p style={p}>
        From time to time we may run giveaways. Participation requires a valid Instagram handle on
        file. Winners will be selected under a random draw amongst participants. Winners will be
        contacted via email or whatsapp, and may also be tagged on Instagram. We reserve the right to
        change or end a giveaway at any time.
      </p>

      <h3 style={h3}>9. Marketing emails</h3>
      <p style={p}>
        If you opt in, we'll send you emails about giveaways and events. You can unsubscribe at any
        time by contacting us at {mail}.
      </p>

      <h3 style={h3}>10. Changes</h3>
      <p style={p}>
        We may update these terms. Continued use of the platform after a change means you accept the
        updated terms.
      </p>

      <h3 style={h3}>11. Contact</h3>
      <p style={{ ...p, marginBottom: 0 }}>
        Questions about these terms: {mail}.
      </p>
    </LegalLayout>
  );
}
