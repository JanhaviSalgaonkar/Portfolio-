import { useState } from 'react';
import { projects } from '../data.js';

function Card({ p }) {
  const tilt = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(6px)`;
  };
  const reset = e => (e.currentTarget.style.transform = '');
  return (
    <article className={'card tilt' + (p.featured ? ' featured' : '')} onMouseMove={tilt} onMouseLeave={reset}>
      <div className="emoji" aria-hidden="true">{p.emoji}</div>
      <h3>{p.title}{p.featured && <small> ★ featured</small>}</h3>
      <p>{p.desc}</p>
      <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
      <div className="row">
        {p.live && p.live !== '#' && <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
        <a href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>
      </div>
    </article>
  );
}

export default function Projects() {
  const filters = ['All', 'Web App', 'PHP', 'Three.js', 'JavaScript'];
  const [f, setF] = useState('All');
  const list = projects.filter(p => f === 'All' || p.tags.includes(f));
  return (
    <>
      <h2 className="title">Projects</h2>
      <div className="chips">{filters.map(x => <button key={x} className={x === f ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
      <div className="grid">{list.map(p => <Card key={p.title} p={p} />)}</div>
    </>
  );
}
