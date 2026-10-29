import { skills, soft } from '../data.js';
export default function Skills() {
  return (
    <>
      <h2 className="title">Skills</h2>
      <div className="grid">
        {skills.map(g => (
          <div className="card" key={g.group}>
            <h3>{g.group}</h3>
            {g.items.map(([name, lvl]) => (
              <div className="bar" key={name}>
                <span>{name}</span>
                <div className="track"><div className="fill" style={{ '--w': lvl + '%' }} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <h3>Soft skills</h3>
      <div className="tags big">{soft.map(s => <span key={s}>{s}</span>)}</div>
    </>
  );
}
