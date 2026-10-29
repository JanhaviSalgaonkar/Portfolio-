import { lazy, Suspense, useEffect, useState } from 'react';
import { profile } from './data.js';

// Code-splitting: heavy 3D + each section load on demand.
const Hero3D = lazy(() => import('./Hero3D.jsx'));
const Projects = lazy(() => import('./sections/Projects.jsx'));
const Skills = lazy(() => import('./sections/Skills.jsx'));
const Resume = lazy(() => import('./sections/Resume.jsx'));
const Contact = lazy(() => import('./sections/Contact.jsx'));
const links = ['about', 'projects', 'skills', 'resume', 'contact'];

function LazySection({ id, children }) {
  const [ref, setRef] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShow(true), io.disconnect()), { rootMargin: '300px' });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <section id={id} ref={setRef} className="section">
      {show && <Suspense fallback={<p className="muted">Loading…</p>}><div className="reveal">{children}</div></Suspense>}
    </section>
  );
}

function Typing({ words }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const id = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % words.length); }
    }, !del && n === w.length ? 1300 : del ? 40 : 80);
    return () => clearTimeout(id);
  }, [n, del, i, words]);
  return <span className="typing">{words[i].slice(0, n)}<i /></span>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => setPct(scrollY / (document.documentElement.scrollHeight - innerHeight) * 100);
    const glow = e => { document.documentElement.style.setProperty('--mx', e.clientX + 'px'); document.documentElement.style.setProperty('--my', e.clientY + 'px'); };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('pointermove', glow);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', glow); };
  }, []);
  return (
    <>
      <div className="progress" style={{ width: pct + '%' }} />
      <div className="cursor-glow" />
      <header className="nav">
        <a href="#about" className="logo">J<span>.</span>S</a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? 'open' : ''}>
          {links.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>{l}</a>)}
        </nav>
      </header>
      <main>
        <section id="about" className="hero">
          <Suspense fallback={null}><Hero3D /></Suspense>
          <div className="hero-text">
            <p className="muted">Hello, I’m</p>
            <h1>{profile.name}</h1>
            <h2><Typing words={profile.roles} /></h2>
            <p className="bio">{profile.bio}</p>
            <div className="row">
              <a className="btn" href="#projects">Explore my projects</a>
              <a className="btn ghost" href="/resume.pdf" download>Download résumé</a>
            </div>
            <p className="hint muted">✨ Move your mouse, the planet follows.</p>
          </div>
        </section>
        <LazySection id="projects"><Projects /></LazySection>
        <LazySection id="skills"><Skills /></LazySection>
        <LazySection id="resume"><Resume /></LazySection>
        <LazySection id="contact"><Contact /></LazySection>
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name} · Built with React &amp; Three.js</footer>
    </>
  );
}
