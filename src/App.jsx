import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import IntakeForm from './pages/IntakeForm';
import AdminDashboard from './pages/AdminDashboard';
import SessionDetail from './pages/SessionDetail';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import OurStory from './pages/OurStory';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" replace />;
  if (role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

// The form is open to: logged-in users, guests who tapped "continue without
// signing up", and returning guests with a saved profile. Brand-new visitors
// see the welcome (sign in) page first.
function FormGate({ children }) {
  const token = localStorage.getItem('token');
  const guest = localStorage.getItem('guest_ok');
  const savedProfile = localStorage.getItem('profile_id');
  if (!token && !guest && !savedProfile) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  // Capture UTM params on first load and persist in sessionStorage so they
  // survive navigation before the user reaches the intake form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
      const v = params.get(k);
      if (v) sessionStorage.setItem(k, v);
    });
  }, []);

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login"  element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={
            <FormGate><IntakeForm /></FormGate>
          } />
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
          <Route path="/admin/sessions/:id" element={
            <AdminRoute><SessionDetail /></AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
