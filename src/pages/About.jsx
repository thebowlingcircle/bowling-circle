import LegalLayout from '../components/LegalLayout';
import useMeta from '../lib/useMeta';

const h2 = { fontSize: 19, fontWeight: 800, marginTop: 28, marginBottom: 10 };
const p  = { color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 };

export default function About() {
  useMeta(
    'About Us | The Bowling Circle Pune',
    'The Bowling Circle is a Pune-based social meetup platform that pairs strangers into small bowling groups — a low-pressure way to make real friends in the city.'
  );

  return (
    <LegalLayout title="About The Bowling Circle">
      <p style={p}>
        The Bowling Circle is a social meetup platform based in Pune. We help adults in the city meet
        new people through bowling — no swiping, no small talk over coffee that goes nowhere, just a
        shared activity with a small group of people you haven't met yet.
      </p>

      <h2 style={h2}>What we do</h2>
      <p style={p}>
        We're not a dating app, and we're not an unmoderated WhatsApp group. Every session is curated
        by an admin who reviews each submission and puts together a small, thoughtfully matched group
        based on availability, group size preference, and other details you share with us. You show up,
        you bowl, you meet people. That's it.
      </p>

      <h2 style={h2}>Where we operate</h2>
      <p style={p}>
        Right now, sessions run weekly at{' '}
        <strong>The Game Palacio Pune - The Mills, Sangamwadi</strong>, with afternoon and night slots
        available. As The Bowling Circle grows, we plan to add more venues across Pune.
      </p>

      <h2 style={h2}>Why bowling</h2>
      <p style={p}>
        Bowling gives people something to do together that isn't just sitting across a table making
        conversation. It's easy for anyone to pick up, works in small groups, and gives natural breaks
        in the game for people to actually talk. It's low-pressure by design.
      </p>

      <h2 style={h2}>Who it's for</h2>
      <p style={{ ...p, marginBottom: 0 }}>
        The Bowling Circle is for anyone in Pune looking to meet new people — people who've recently
        moved to the city, people whose friend groups have scattered, people who just want to try
        something new on a Wednesday night. You don't need a partner, a plus-one, or an existing
        group. You just need to show up.
      </p>
    </LegalLayout>
  );
}
