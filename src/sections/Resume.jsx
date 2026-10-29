import { resume } from '../data.js';
export default function Resume() {
  return (
    <>
      <h2 className="title">Education &amp; Résumé</h2>
      <ul className="timeline">
        {resume.map(r => (
          <li key={r.role}>
            <strong>{r.role}</strong> · {r.org} <span className="muted">({r.when})</span>
            {r.note && <p>{r.note}</p>}
          </li>
        ))}
      </ul>
      <a className="btn" href="/resume.pdf" download>Download PDF résumé</a>
    </>
  );
}
