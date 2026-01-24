import { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FeaturesSection } from './components/FeaturesSection';
import { AboutSection } from './components/AboutSection';
import { SupportSection } from './components/SupportSection';
import { sectionAnim } from './sections/sectionAnim';
import logo from './assets/icon.png';
import prev1 from './assets/prev1.png';
import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';
import image5 from './assets/5.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://serpbackend.vercel.app';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', institution: '', address: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const heroTagRef = useRef(null);
  const previewGroups = useMemo(() => [
    [prev1, image1, image2],
    [image3, image4, image5]
  ], []);
  const [activeSlides, setActiveSlides] = useState([0, 0]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  useGSAP(() => {
    if (!heroTagRef.current) return;
    gsap.fromTo(
      heroTagRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0.6 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.25 }
    );
  }, []);

  useEffect(() => {
    if (!previewGroups.length) return undefined;
    const id = setInterval(() => {
      setActiveSlides((prev) => prev.map((idx, i) => (idx + 1) % previewGroups[i].length));
    }, 4000);
    return () => clearInterval(id);
  }, [previewGroups]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Unable to submit');
      }

      setStatus('success');
      setFeedback(data?.message || 'Message sent. We will reach out.');
      setForm({ name: '', email: '', institution: '', address: '', message: '' });
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="page">
      <header className={`topbar ${navOpen ? 'nav-open' : ''}`}>
        <div className="brand">
          <img src={logo} alt="SERP Vidya ERP" className="brand-logo" />
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={toggleNav}
        >
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
        <nav className={`top-nav ${navOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeNav}>About</a>
          <a href="#features" onClick={closeNav}>Features</a>
          <a href="#support" onClick={closeNav}>Support</a>
          <a href="#contact" onClick={closeNav}>Contact</a>
        </nav>
        <a className="top-cta" href="#contact">Contact Us</a>
      </header>

      <main>
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-copy">
            <p className="eyebrow">Reliable operations for schools</p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            >
              <span className="hero-title-text">A simple School ERP built for clear and reliable school management.</span>
            </motion.h1>
            <p className="lede">
              Clear scope, lean features, and a product that is in active use by early schools. No hype—just the essentials.
            </p>
            <div className="hero-actions">
              <a className="primary" href="#contact">Learn More</a>
            </div>
            <div className="hero-tagline" ref={heroTagRef}>Digital learning possible with SERP</div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="carousel-duo">
              {previewGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="carousel-card">
                  <div className="carousel-main">
                    <div className="carousel-media" aria-label="Replace with Figma export">
                      <img
                        src={group[activeSlides[groupIdx]]}
                        alt="App preview"
                        className="carousel-media-img"
                      />
                    </div>
                    <div className="carousel-dots" aria-hidden="true">
                      {group.map((_, idx) => (
                        <span
                          key={idx}
                          className={`dot ${idx === activeSlides[groupIdx] ? 'active' : ''}`}
                          onClick={() => setActiveSlides((prev) => prev.map((val, j) => (j === groupIdx ? idx : val)))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <FeaturesSection />

        <AboutSection />

        <motion.section id="status" className="card-section" {...sectionAnim}>
          <h2>Product status</h2>
          <div className="status-card">
            <p>The system is currently in active development and being used by early schools.</p>
            <p>Feedback-driven improvements are ongoing.</p>
          </div>
        </motion.section>

        <SupportSection />

          <motion.section id="contact" className="card-section contact-section" {...sectionAnim}>
          <h2>Contact us</h2>
          <div className="contact-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                <span>Institution Name</span>
                <input
                  type="text"
                  value={form.institution}
                  onChange={handleChange('institution')}
                  placeholder="School or institution"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                <span>Address</span>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="City, State"
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  rows="4"
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="What do you need help with?"
                  required
                />
              </label>
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
              {feedback && <div className={`feedback ${status}`}>{feedback}</div>}
            </form>
            <div className="contact-note">
              <div className="note-card">
                <div className="note-title">Why contact?</div>
                <p>We onboard schools gradually. Reach out to see the live product or to join the early cohort.</p>
                <p className="note-meta">Responses within one business day.</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-title">SERP Vidya ERP</div>
          <p className="footer-text">Built for reliable school operations.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-label">Explore</div>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#support">Support</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <div className="footer-label"><p>Reach us at</p>
              <a href="mailto:erpserfvidya@gmail.com">erpserfvidya@gmail.com</a>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
