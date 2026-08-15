import LegalLayout from '../components/LegalLayout';
import useMeta from '../lib/useMeta';

const p = { color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 };

export default function OurStory() {
  useMeta(
    'Our Story | The Bowling Circle Pune',
    'Why The Bowling Circle exists — a simple idea to help people in Pune meet each other in real life, one bowling session at a time.'
  );

  return (
    <LegalLayout title="Our Story">
      <p style={p}>
        The Bowling Circle started with a simple observation: making new friends as an adult is harder
        than it should be.
      </p>
      <p style={p}>
        Once you're past college, the easy, built-in ways of meeting people mostly disappear. Work
        doesn't always give you that. Dating apps aren't built for it, and using them just to make
        friends feels like using the wrong tool for the job. Existing meetup groups on WhatsApp or
        Instagram are often unmoderated, inconsistent, or just don't feel safe to walk into alone.
      </p>
      <p style={p}>
        We wanted to build something different — a way to meet new people in Pune that felt structured
        enough to trust, but casual enough to actually enjoy. Bowling made sense. It's an activity
        almost everyone can do regardless of skill level, it naturally puts people in small groups, and
        there's enough going on that conversation doesn't have to carry the entire evening.
      </p>
      <p style={p}>
        So that's what we built: a simple form, a real person reviewing every submission, and small
        groups of strangers meeting up over a few games of bowling. No algorithm deciding who you
        should be friends with — just thoughtful, manual matching, one session at a time.
      </p>
      <p style={{ ...p, marginBottom: 0 }}>
        We're still early, and we're building this one Wednesday at a time. If you're in Pune and
        looking for a low-pressure way to meet new people, we'd love to have you at our next session.
      </p>
    </LegalLayout>
  );
}
