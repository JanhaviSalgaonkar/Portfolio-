import { useState } from 'react';
import { profile } from '../data.js';
export default function Contact() {
  const [f, setF] = useState({ name: '', message: '' });
  const submit = e => {
    e.preventDefault();
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name}`);
    window.location.href = `mailto:${profile.email}?subject=Portfolio%20enquiry&body=${body}`;
  };
  return (
    <>
      <h2 className="title">Let’s work together</h2>
      <form className="form" onSubmit={submit}>
        <label>Your name<input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></label>
        <label>Message<textarea required rows="5" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} /></label>
        <button className="btn" type="submit">Send message</button>
      </form>
      <p className="row"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
    </>
  );
}
