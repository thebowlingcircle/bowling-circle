import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitForm, getMyProfile, getGuestProfile } from '../lib/api';
import Logo, { LogoStacked } from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

const DAYS = ['wednesday'];
const BASE_TIMES = [
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'night', label: 'Night' },
];
const SIZES = ['2-3','4-5','5-6','any'];
const VENUES = [
  {
    id: 'game-palacio',
    name: 'The Game Palacio Pune - The Mills, Sangamwadi',
    comingSoon: false,
    prices: { afternoon: 600, night: 850 }
  },
  {
    id: 'kopa',
    name: 'KOPA - Coming Soon',
    comingSoon: true,
    prices: { afternoon: null, night: null }
  }
];

// Migrate old area values (full name strings) to venue IDs so existing profiles load correctly
function areaToId(area) {
  if (!area) return '';
  if (VENUES.find(v => v.id === area)) return area;
  const byName = VENUES.find(v => v.name === area);
  return byName ? byName.id : area;
}

const EMPTY = {
  name:'', age:'', gender:'', area:'', whatsapp:'', email:'', occupation:'',
  interests:'', bio:'', group_size_pref:'', instagram:'', marketing_opt_in:false,
  availability:{ days:['wednesday'], times:[] }
};


// ── Input sanitizers ──
const sanitize = {
  // names: letters (Latin + Devanagari), spaces, hyphen, apostrophe
  name:  v => v.replace(/[^a-zA-Zऀ-ॿ\s'\-]/g, ''),
  // phone: digits only, one leading + allowed
  phone: v => { const clean = v.replace(/[^0-9+]/g, ''); return clean.startsWith('+') ? '+' + clean.slice(1).replace(/\+/g,'') : clean.replace(/\+/g,''); },
  // general text: letters, digits, spaces, . , - ' ( ) & — no @ # $ ! % ^ * etc.
  text:  v => v.replace(/[^a-zA-Z0-9ऀ-ॿ\s.,\-'()&]/g, ''),
  // bio: same but also allow ? ! and newlines
  free:  v => v.replace(/[^a-zA-Z0-9ऀ-ॿ\s.,\-'()&?!\n]/g, ''),
  // instagram handle: strip any @ and keep only valid handle chars (letters, digits, . _)
  instagram: v => v.replace(/@/g, '').replace(/[^a-zA-Z0-9._]/g, ''),
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function validEmail(v) { return EMAIL_RE.test(String(v).trim()); }

function profileToForm(p) {
  return {
    name: p.name || '', age: p.age || '', gender: p.gender || '', area: areaToId(p.area || ''),
    whatsapp: p.whatsapp || '', email: p.email || '', occupation: p.occupation || '',
    interests: p.interests || '', bio: p.bio || '', group_size_pref: p.group_size_pref || '',
    instagram: p.instagram || '', marketing_opt_in: !!p.marketing_opt_in,
    availability: { days: ['wednesday'], times: p.availability?.times || [] }
  };
}

export default function IntakeForm() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [secretWord, setSecretWord] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

  const selectedVenue = VENUES.find(v => v.id === form.area) || null;
  const isComingSoon = selectedVenue?.comingSoon ?? false;

  function timeLabel(base) {
    if (!selectedVenue || isComingSoon) return `${base.label} — Coming Soon`;
    const price = selectedVenue.prices[base.value];
    return price != null ? `${base.label} — ₹${price}` : base.label;
  }

  useEffect(() => {
    async function load() {
      try {
        if (isLoggedIn) {
          const d = await getMyProfile();
          if (d?.profile) { setForm(profileToForm(d.profile)); setHasExisting(true); }
        } else {
          const id = localStorage.getItem('profile_id');
          const key = localStorage.getItem('profile_key');
          if (id && key) {
            const d = await getGuestProfile(id, key);
            if (d?.profile) { setForm(profileToForm(d.profile)); setHasExisting(true); }
          }
        }
      } catch {
        // Saved profile no longer valid — clear and start fresh
        localStorage.removeItem('profile_id');
        localStorage.removeItem('profile_key');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function toggleAvail(type, val) {
    setForm(f => {
      const arr = f.availability[type];
      return { ...f, availability: { ...f.availability, [type]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] } };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        age: parseInt(form.age),
        utm_source:   sessionStorage.getItem('utm_source')   || undefined,
        utm_medium:   sessionStorage.getItem('utm_medium')   || undefined,
        utm_campaign: sessionStorage.getItem('utm_campaign') || undefined,
      };
      if (isLoggedIn && secretWord.trim()) payload.secretWord = secretWord.trim();
      const result = await submitForm(payload);
      localStorage.setItem('profile_id', result.id);
      if (result.edit_key) localStorage.setItem('profile_key', result.edit_key);
      setSubmitted(true);
      setHasExisting(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleSignOut() {
    localStorage.clear();
    window.location.href = '/login';
  }

  if (loading) return <div className="auth-page"><p>Loading…</p></div>;

  if (submitted) return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 460, textAlign: 'center' }}>
        <LogoStacked />
        <div className="success-icon">🎳</div>
        <h1>You're in, {form.name.split(' ')[0]}!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
          We'll WhatsApp you when we find a good group for you in Pune.
        </p>
        <div className="info-note">
          ✓ Your details are saved on this device — you won't have to re-enter them.
        </div>
        {!isLoggedIn && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 16 }}>
            Want your profile on any device? <a href="/signup" style={{ color: 'var(--primary)' }}>Create a free account</a>.
          </p>
        )}
        <button className="btn" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>
          Edit my details
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '24px 16px 48px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24 }}>
          <Logo height={44} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <ThemeToggle />
            {isLoggedIn
              ? <button className="btn" onClick={handleSignOut} style={{ fontSize: 13 }}>Sign Out</button>
              : <a href="/login" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700 }}>Sign in</a>}
          </div>
        </div>

        <div className="hero">
          <h1>{hasExisting ? `Welcome back${form.name ? ', ' + form.name.split(' ')[0] : ''}!` : <>Join <span className="accent">The Bowling Circle</span></>}</h1>
          <p>{hasExisting
            ? 'Your details are saved. Update anything below and resubmit.'
            : 'Meet new people in Pune over a game of bowling. Tell us about yourself and we’ll match you into a group.'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card form-section">
            <h3 className="section-title">👤 About you</h3>
            <div className="field"><label>Full Name *</label>
              <input value={form.name} onChange={e => set('name', sanitize.name(e.target.value))} required placeholder="Your name" /></div>
            <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div className="field"><label>Age *</label>
                <input type="number" min={16} max={80} value={form.age} onChange={e => set('age', e.target.value)} required placeholder="e.g. 25" /></div>
              <div className="field"><label>Gender *</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)} required>
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                </select></div>
            </div>
            <div className="field"><label>Bowling Arena *</label>
              <select value={form.area} onChange={e => set('area', e.target.value)} required>
                <option value="">Select a bowling arena</option>
                {VENUES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select></div>
            {isComingSoon && (
              <div className="info-note" style={{ marginBottom: 12 }}>
                This venue isn't open for bookings yet — check back soon, or pick an available venue above to continue.
              </div>
            )}
            <div className="field" style={{ marginBottom: 0 }}><label>Occupation</label>
              <input value={form.occupation} onChange={e => set('occupation', sanitize.text(e.target.value))} placeholder="Student, engineer, between jobs — anything goes" /></div>
          </div>

          <div className="card form-section" style={isComingSoon ? { opacity: 0.5 } : undefined}>
            <h3 className="section-title">📱 Contact</h3>
            <div className="field"><label>WhatsApp Number *</label>
              <input type="tel" value={form.whatsapp} onChange={e => set('whatsapp', sanitize.phone(e.target.value))} required placeholder="98XXXXXXXX" inputMode="tel" disabled={isComingSoon} /></div>
            <div className="field"><label>Email *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value.replace(/\s/g,''))} onBlur={() => setEmailTouched(true)} required placeholder="you@example.com" autoComplete="email" disabled={isComingSoon} />
              <span className="field-hint">We use this to save your spot and send session details.</span>
              {emailTouched && form.email && !validEmail(form.email) && <span className="field-hint" style={{color:'var(--danger)'}}>Enter a valid email like you@example.com</span>}</div>
            <div className="field" style={{ marginBottom: 0 }}><label>Instagram (optional)</label>
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid var(--border)', borderRadius:'var(--radius-sm)', background:'var(--surface)', overflow:'hidden' }}>
                <span style={{ padding:'0 2px 0 14px', color:'var(--text-muted)', fontWeight:700, userSelect:'none' }}>@</span>
                <input value={form.instagram} onChange={e => set('instagram', sanitize.instagram(e.target.value))} placeholder="yourhandle" disabled={isComingSoon}
                  style={{ border:'none', boxShadow:'none', background:'transparent', paddingLeft:2, flex:1 }} />
              </div>
              <span className="field-hint">This field is mandatory if you want to participate in our giveaways.</span></div>
          </div>

          <div className="card form-section" style={isComingSoon ? { opacity: 0.5 } : undefined}>
            <h3 className="section-title">📅 Availability</h3>
            <div className="field"><label>Available Days</label>
              <div className="pill-row">
                {DAYS.map(d => (
                  <button type="button" key={d}
                    className={`pill ${form.availability.days.includes(d) ? 'active' : ''}`}
                    disabled>{d.slice(0,3)}</button>
                ))}</div></div>
            <div className="field" style={{ marginBottom: 0 }}><label>Preferred Times</label>
              <div className="pill-row">
                {BASE_TIMES.map(t => (
                  <button type="button" key={t.value}
                    className={`pill ${form.availability.times.includes(t.value) ? 'active' : ''}`}
                    onClick={() => toggleAvail('times', t.value)}
                    disabled={isComingSoon}>{timeLabel(t)}</button>
                ))}</div></div>
          </div>

          <div className="card form-section" style={isComingSoon ? { opacity: 0.5 } : undefined}>
            <h3 className="section-title">🎳 Preferences</h3>
            <div className="field"><label>Group Size</label>
              <div className="pill-row">
                {SIZES.map(s => (
                  <button type="button" key={s}
                    className={`pill ${form.group_size_pref === s ? 'active' : ''}`}
                    onClick={() => set('group_size_pref', s)}
                    disabled={isComingSoon}>{s}</button>
                ))}</div></div>
            <div className="field"><label>Interests / Hobbies</label>
              <input value={form.interests} onChange={e => set('interests', sanitize.text(e.target.value))} placeholder="Music, trekking, food…" disabled={isComingSoon} /></div>
            <div className="field" style={{ marginBottom: 0 }}><label>Anything else to know about you?</label>
              <textarea value={form.bio} onChange={e => set('bio', sanitize.free(e.target.value))} rows={3} placeholder="Optional" disabled={isComingSoon} /></div>
          </div>

          {isLoggedIn && (
            <div className="card form-section">
              <h3 className="section-title">🔐 Account Security</h3>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Secret Word <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(for password recovery — separate from your password)</span></label>
                <input type="text" value={secretWord} onChange={e => setSecretWord(e.target.value)}
                  autoComplete="off" placeholder="Leave blank to keep existing" />
                <span className="field-hint">Used to verify your identity if you ever forget your password. Leave blank to keep your current secret word.</span>
              </div>
            </div>
          )}

          <div className="card form-section" style={isComingSoon ? { opacity: 0.5 } : undefined}>
            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontWeight:700, fontSize:14 }}>
              <input type="checkbox" checked={form.marketing_opt_in}
                onChange={e => set('marketing_opt_in', e.target.checked)}
                disabled={isComingSoon} style={{ width:'auto', margin:0 }} />
              Send me emails about giveaways and events
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary btn-lg" type="submit" disabled={saving || isComingSoon || (form.email && !validEmail(form.email))} style={{ width:'100%', gap: 10 }}>
            {saving && <span className="spinner" />}
            {saving ? 'Saving…' : hasExisting ? 'Update my details' : 'Count me in 🎳'}
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center', marginTop: 12 }}>
            Your details are saved on this device so you won't have to re-enter them.
          </p>
        </form>
      </div>
    </div>
  );
}
