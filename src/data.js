export const profile = {
  name: 'Janhavi Salgaonkar',
  roles: ['Web Developer', 'React Developer', 'Java & Spring Boot Learner', '3D Web Explorer'],
  bio: 'Computer Science graduate (University of Mumbai, 2026) who loves turning ideas into interactive, user-friendly web experiences, from database-driven PHP/MySQL apps to 3D worlds with Three.js. Looking for an entry-level Web or Software Developer role.',
  email: 'janhavisalgaonkar19@gmail.com',
  github: 'https://github.com/JanhaviSalgaonkar',
  linkedin: 'https://www.linkedin.com/in/your-linkedin-id' // TODO: paste your real LinkedIn URL
};
// TODO: replace '#' with each project's live link / GitHub repo and refine the descriptions.
export const projects = [
  { title: 'AstroVerse', emoji: '🪐', featured: true, desc: 'Interactive 3D Solar System with planet exploration, Galaxy Explorer, quiz, score tracking and a leaderboard.', tags: ['Three.js', 'JavaScript', 'Bootstrap'], live: 'https://astroverse-kappa.vercel.app/', repo: profile_gh('AstroVerse') },
  { title: 'ShopKart', emoji: '🛒', desc: 'Online shopping experience with product browsing and cart.', tags: ['Web App'], live: '#', repo: profile_gh('') },
  { title: 'MyPlants', emoji: '🌿', desc: 'A plant-themed web app for exploring and managing plants.', tags: ['Web App'], live: '#', repo: profile_gh('') },
  { title: 'Bitebox', emoji: '🍔', desc: 'Food ordering website with a clean, appetising UI.', tags: ['Web App'], live: '#', repo: profile_gh('') },
  { title: 'IcyScOops', emoji: '🍨', desc: 'Playful ice-cream parlour website.', tags: ['HTML', 'CSS', 'JavaScript'], live: '#', repo: profile_gh('') },
  { title: 'AquaWorld', emoji: '🐠', desc: 'Underwater-themed website about aquatic life.', tags: ['HTML', 'CSS', 'JavaScript'], live: '#', repo: profile_gh('') },
  { title: 'TeaLand', emoji: '🍵', desc: 'Tea brand storefront with a calm, modern look.', tags: ['HTML', 'CSS', 'JavaScript'], live: '#', repo: profile_gh('') },
  { title: 'Online Pharmacy Shop', emoji: '💊', desc: 'Full-stack pharmacy system: secure authentication, order management, dynamic cart, medicine catalog and a normalized MySQL database.', tags: ['PHP', 'MySQL', 'HTML', 'CSS'], live: '', repo: profile_gh('') },
  { title: 'Child Vaccination Management', emoji: '💉', desc: 'Child registration, vaccination scheduling, vaccine inventory tracking and appointments on a relational healthcare database.', tags: ['PHP', 'MySQL', 'HTML', 'CSS'], live: '', repo: profile_gh('') }
];
function profile_gh(name) { return 'https://github.com/JanhaviSalgaonkar' + (name ? '/' + name : ''); }
export const skills = [
  { group: 'Languages', items: [['Java', 70], ['JavaScript', 80], ['Python', 65], ['PHP', 75], ['HTML5', 92], ['CSS3', 88]] },
  { group: 'Frontend', items: [['React.js', 78], ['Bootstrap', 85], ['Three.js', 70]] },
  { group: 'Backend & Data', items: [['Spring Boot', 60], ['MySQL', 80]] },
  { group: 'Tools', items: [['Git & GitHub', 82], ['Vercel', 80], ['OOP', 80]] }
];
export const soft = ['Teamwork', 'Problem-solving', 'Time management', 'Communication'];
export const resume = [
  { role: 'Bachelor of Computer Science', org: 'University of Mumbai', when: '2023 – 2026', note: '' },
  { role: 'Web Development Course', org: 'Itvedant', when: 'Certification', note: 'HTML, CSS, JavaScript and web fundamentals.' },
  { role: 'Higher Secondary (HSC)', org: 'Maharashtra Board', when: '2021 – 2023', note: '' },
  { role: 'Secondary School (SSC)', org: 'Maharashtra Board', when: '2020 – 2021', note: '' }
];
