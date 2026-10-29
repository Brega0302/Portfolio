"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Copy, Github, Linkedin, Menu, X, MapPin, Layers, Database, Cpu, Coffee, Newspaper } from 'lucide-react';
import { useLanguage } from '@/src/context/language-context';
import { PortfolioChat } from '@/src/components/ui/portfolio-chat';

const email = 'adin.brkic0302@gmail.com';
const github = 'https://github.com/Brega0302';
const linkedin = 'https://www.linkedin.com/in/adin-brkic-6971472b8/';
const words = {
  en: {
    nav: ['About', 'Work', 'Skills', 'Chat', 'Contact'], available: 'Open to internship opportunities',
    role: 'SOFTWARE ENGINEERING STUDENT', hello: 'Hi, I’m Adin Brega Brkic.', headline: 'Turning real problems', accent: 'into useful software.',
    intro: 'I build web applications, explore how systems work, and bring a business perspective from managing a café. Currently looking for a software development internship.',
    work: 'Explore my work', contact: 'Let’s talk', location: 'Bosnia & Herzegovina', studying: 'Software Engineering · IUS', minor: 'Minor in Management',
    portrait: 'A little curiosity. A lot of building.', focus: 'CURRENT FOCUS', focusText: 'Full-stack development & reliable software',
    workLabel: '01 / SELECTED WORK', workTitle: 'Built to solve something.', workIntro: 'From everyday café operations to independent publishing. A selection of what I’m working on.',
    lensCategory: 'FULL-STACK APPLICATION', lensDesc: 'A management system shaped by the daily reality of running a café. Warehouse stock, purchasing, transfers and a two-shift sales ledger, connected in one place.',
    progress: 'In active development', portalCategory: 'INDEPENDENT PUBLISHING', portalDesc: 'My independent online news portal. A personal project at the intersection of publishing, digital presence and the web.',
    portalStatus: 'My news portal', source: 'Explore source', visit: 'Visit portal', overview: 'Project overview', warehouse: 'Warehouse', cafe: 'Café stock', ledger: 'Daily ledger', connected: 'One connected workflow', portalNote: 'A place for stories that matter.',
    more: 'More from the workbench', all: 'All projects', web: 'Web & full stack', systems: 'Systems & testing',
    aboutLabel: '02 / A LITTLE CONTEXT', aboutTitle: 'Code meets the real world.',
    aboutText: 'I study Software Engineering at the International University of Sarajevo, with a minor in Management. Alongside my studies, I manage a café and build independent projects.',
    aboutText2: 'Working with customers and coordinating a team has taught me to ask better questions before writing code. I’m interested in software that makes everyday work simpler, and I’m ready to learn from an experienced development team.',
    education: 'EDUCATION', educationValue: 'International University of Sarajevo', educationNote: 'Software Engineering · Management minor', experience: 'BEYOND THE CODE', experienceValue: 'Café operations & independent projects', experienceNote: 'Teamwork, customer needs and practical problem-solving',
    skillsLabel: '03 / TOOLKIT', skillsTitle: 'The tools behind the work.', skillsIntro: 'Technologies I use and concepts I explore through practical and academic projects.', frontend: 'Interfaces', backend: 'Behind the scenes', lowlevel: 'Systems & foundations', quality: 'Workflow & quality',
    chatLabel: '04 / ASK AWAY', chatTitle: 'A more interactive introduction.', chatIntro: 'Explore my projects, technical interests and contact details with the portfolio assistant.',
    contactLabel: '05 / WHAT’S NEXT', contactTitle: 'Let’s build', contactAccent: 'something useful.', contactText: 'Looking for a curious developer to join your team? I’m open to internships, learning opportunities and conversations about building better software.',
    send: 'Get in touch', copied: 'Email copied', copyEmail: 'Copy email address', copyFailed: 'Copy unavailable. Select the email address or use Gmail.', back: 'Back to top', footer: 'Made with curiosity, in Bosnia & Herzegovina.', menu: 'Open navigation', close: 'Close navigation',
  },
  bs: {
    nav: ['O meni', 'Projekti', 'Vještine', 'Chat', 'Kontakt'], available: 'Otvoren za internship prilike',
    role: 'STUDENT SOFTVERSKOG INŽENJERSTVA', hello: 'Zdravo, ja sam Adin Brega Brkic.', headline: 'Stvarne probleme', accent: 'pretvaram u softver.',
    intro: 'Razvijam web aplikacije, istražujem kako sistemi rade i donosim poslovnu perspektivu iz vođenja kafića. Trenutno tražim praksu u razvoju softvera.',
    work: 'Pogledaj projekte', contact: 'Razgovarajmo', location: 'Bosna i Hercegovina', studying: 'Softversko inženjerstvo · IUS', minor: 'Minor iz menadžmenta',
    portrait: 'Radoznalost koja vodi do novih projekata.', focus: 'TRENUTNI FOKUS', focusText: 'Full-stack razvoj i pouzdan softver',
    workLabel: '01 / ODABRANI PROJEKTI', workTitle: 'Projekti sa stvarnom svrhom.', workIntro: 'Od svakodnevnog poslovanja kafića do nezavisnog izdavaštva. Izbor projekata na kojima radim.',
    lensCategory: 'FULL-STACK APLIKACIJA', lensDesc: 'Sistem oblikovan prema svakodnevnom radu kafića. Magacin, nabavke, izdavanje robe i knjiga pazara za dvije smjene, povezani na jednom mjestu.',
    progress: 'U aktivnom razvoju', portalCategory: 'NEZAVISNO IZDAVAŠTVO', portalDesc: 'Moj nezavisni informativni portal. Lični projekt koji povezuje izdavaštvo, digitalno prisustvo i web.',
    portalStatus: 'Moj informativni portal', source: 'Pogledaj kod', visit: 'Posjeti portal', overview: 'O projektu', warehouse: 'Magacin', cafe: 'Roba u kafiću', ledger: 'Knjiga pazara', connected: 'Jedan povezani tok rada', portalNote: 'Mjesto za priče koje su važne.',
    more: 'Još iz moje radionice', all: 'Svi projekti', web: 'Web i full stack', systems: 'Sistemi i testiranje',
    aboutLabel: '02 / UKRATKO O MENI', aboutTitle: 'Kod u stvarnom svijetu.',
    aboutText: 'Studiram softversko inženjerstvo na Internacionalnom univerzitetu u Sarajevu, uz minor iz menadžmenta. Pored studija vodim kafić i razvijam vlastite projekte.',
    aboutText2: 'Rad s gostima i koordinacija tima naučili su me da postavim prava pitanja prije nego što počnem pisati kod. Zanimaju me rješenja koja olakšavaju svakodnevni rad i spreman sam učiti od iskusnog razvojnog tima.',
    education: 'OBRAZOVANJE', educationValue: 'Internacionalni univerzitet u Sarajevu', educationNote: 'Softversko inženjerstvo · Minor iz menadžmenta', experience: 'IZVAN KODA', experienceValue: 'Vođenje kafića i vlastiti projekti', experienceNote: 'Timski rad, potrebe korisnika i praktično rješavanje problema',
    skillsLabel: '03 / ALATI', skillsTitle: 'Tehnologije iza projekata.', skillsIntro: 'Tehnologije koje koristim i koncepti koje istražujem kroz praktične i akademske projekte.', frontend: 'Korisnički interfejsi', backend: 'Iza interfejsa', lowlevel: 'Sistemi i osnove', quality: 'Radni tok i kvalitet',
    chatLabel: '04 / PITAJ SLOBODNO', chatTitle: 'Interaktivnije upoznavanje.', chatIntro: 'Istraži moje projekte, tehnička interesovanja i kontakt kroz portfolio asistenta.',
    contactLabel: '05 / SLJEDEĆI KORAK', contactTitle: 'Napravimo nešto', contactAccent: 'korisno zajedno.', contactText: 'Tražite radoznalog developera za svoj tim? Otvoren sam za praksu, prilike za učenje i razgovore o razvoju boljeg softvera.',
    send: 'Javi mi se', copied: 'Email kopiran', copyEmail: 'Kopiraj email adresu', copyFailed: 'Kopiranje nije uspjelo. Koristi email link.', back: 'Na vrh', footer: 'Napravljeno s radoznalošću, u Bosni i Hercegovini.', menu: 'Otvori navigaciju', close: 'Zatvori navigaciju',
  },
};

const moreProjects = [
  { name: 'SignalDesk', type: 'web', tags: ['TypeScript', 'React', 'Express', 'SQLite'], repo: 'signaldesk', en: 'Incident management with role-based access, reliable state changes and an audit trail.', bs: 'Upravljanje incidentima uz korisničke uloge, pouzdane promjene stanja i historiju aktivnosti.' },
  { name: 'TAC – TIQ', type: 'web', tags: ['React', 'TypeScript', 'Vite'], repo: 'tac-tiq', live: 'https://brega0302.github.io/tac-tiq/', en: 'Three strategy games in one browser arena, with local play and configurable AI opponents.', bs: 'Tri strateške igre u jednoj browser areni, s lokalnom igrom i podesivim AI protivnicima.' },
  { name: 'Lens Caffe QR Menu', type: 'web', tags: ['React', 'Next.js', 'QR'], repo: 'Lens-Caffe-QR-menu', en: 'A digital café menu, accessible by scanning a QR code on a phone.', bs: 'Digitalni meni kafića kojem se pristupa skeniranjem QR koda na telefonu.' },
  { name: 'Cache Simulator', type: 'systems', tags: ['Computer architecture', 'Simulation'], repo: 'Advanced-Cache-Simulator', en: 'An educational project exploring cache memory, mapping strategies and replacement policies.', bs: 'Edukativni projekt za istraživanje cache memorije, strategija mapiranja i zamjene podataka.' },
  { name: 'Playwright Testing', type: 'systems', tags: ['TypeScript', 'Playwright', 'Testing'], repo: 'Playwright', en: 'Browser automation and software testing through practical test scenarios.', bs: 'Automatizacija preglednika i testiranje softvera kroz praktične testne scenarije.' },
  { name: 'Healthcare', type: 'systems', tags: ['SQL', 'Database design'], repo: 'Healthcare', en: 'A database project focused on healthcare records and relational data modelling.', bs: 'Projekt baze podataka usmjeren na zdravstvene evidencije i relaciono modeliranje podataka.' },
  { name: 'Currency Converter', type: 'systems', tags: ['MIPS Assembly', 'Python'], repo: 'Currency-Converter', en: 'Currency conversion as a hands-on exploration of low-level programming.', bs: 'Konverzija valuta kao praktično istraživanje programiranja niskog nivoa.' },
  { name: 'News Portal', type: 'web', tags: ['React', 'Web'], repo: 'News-Portal', en: 'A separate web project exploring content presentation and responsive interfaces.', bs: 'Zaseban web projekt za istraživanje prikaza sadržaja i responzivnih interfejsa.' },
];

export function PortfolioExperience() {
  const { language, setLanguage } = useLanguage();
  const c = words[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const anchors = ['about', 'projects', 'skills', 'terminal', 'contact'];
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 3000);
    return () => window.clearTimeout(timer);
  }, [copyState]);
  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(email); setCopyState('copied'); }
    catch { setCopyState('error'); }
  };

  return <div className="portfolio">
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-grid"/>
      <div className="ambient-glow ambient-glow-one"/>
      <div className="ambient-glow ambient-glow-two"/>
      <svg className="ambient-orbits" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="orbit-gold" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#d9b975" stopOpacity="0"/><stop offset=".55" stopColor="#d9b975" stopOpacity=".35"/><stop offset="1" stopColor="#d9b975" stopOpacity="0"/></linearGradient></defs>
        <g fill="none" stroke="url(#orbit-gold)"><ellipse cx="1170" cy="320" rx="490" ry="210" transform="rotate(-28 1170 320)"/><ellipse cx="1170" cy="320" rx="610" ry="310" transform="rotate(-28 1170 320)"/><ellipse cx="1170" cy="320" rx="740" ry="410" transform="rotate(-28 1170 320)"/></g>
        <g fill="#e6c88b"><circle cx="810" cy="170" r="2"/><circle cx="1300" cy="540" r="2"/><circle cx="580" cy="650" r="1.5"/></g>
      </svg>
    </div>
    <a href="#main-content" className="skip-link">{language === 'en' ? 'Skip to content' : 'Preskoči na sadržaj'}</a>
    <header className="site-header"><div className="shell nav-bar">
      <a href="#top" className="brand" aria-label="Adin Brega Brkic — home"><Image src="/images/logo.png" alt="" width={38} height={38}/><span className="brand-fullname">Adin <span className="gold">Brega</span> Brkic</span></a>
      <nav className="desktop-nav" aria-label={language === 'en' ? 'Main navigation' : 'Glavna navigacija'}>{anchors.map((id,i) => <a href={`#${id}`} key={id}>{c.nav[i]}</a>)}</nav>
      <div className="nav-actions"><div className="language-control" aria-label={language === 'en' ? 'Language' : 'Jezik'}>{(['en','bs'] as const).map(lang => <button key={lang} aria-pressed={language === lang} onClick={() => { setLanguage(lang); setCopyState('idle'); }}>{lang.toUpperCase()}</button>)}</div><a className="nav-contact" href="#contact">{c.contact}<ArrowUpRight size={15}/></a><button className="menu-toggle" aria-label={menuOpen ? c.close : c.menu} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </div>{menuOpen && <nav id="mobile-nav" className="mobile-nav shell" aria-label={language === 'en' ? 'Mobile navigation' : 'Mobilna navigacija'}>{anchors.map((id,i) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{c.nav[i]}<ArrowUpRight size={17}/></a>)}</nav>}</header>
    <main id="main-content">
      <section id="top" className="hero shell"><div className="hero-content"><div className="availability"><span/>{c.available}</div><p className="eyebrow hero-eyebrow">{c.role}</p><p className="hero-greeting">{c.hello}</p><h1>{c.headline}<br/><span>{c.accent}</span></h1><p className="hero-intro">{c.intro}</p><div className="hero-actions"><a href="#projects" className="button button-gold">{c.work}<ArrowDown size={17}/></a><a href="#contact" className="button button-outline">{c.contact}<ArrowUpRight size={17}/></a></div><div className="hero-links"><a href={github} target="_blank" rel="noopener noreferrer"><Github size={17}/>GitHub<ArrowUpRight size={12}/></a><a href={linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/>LinkedIn<ArrowUpRight size={12}/></a></div></div>
      <div className="portrait-composition"><span className="portrait-index" aria-hidden="true">AB / 01</span><div className="portrait-frame"><Image src="/images/viber-image-2024-10-25-19-37-55-805.png" alt="Adin Brkić" fill priority sizes="(max-width: 700px) 80vw, 390px" className="portrait-image"/><div className="portrait-caption"><span>Adin Brkić</span><span>{c.portrait}</span></div></div><div className="focus-note"><Code2 size={20}/><div><span className="eyebrow">{c.focus}</span><p>{c.focusText}</p></div></div></div></section>
      <div className="intro-strip shell"><span><MapPin size={15}/>{c.location}</span><span>{c.studying}</span><span>{c.minor}</span><a href="#projects">{language === 'en' ? 'SCROLL TO EXPLORE' : 'ISTRAŽI PROJEKTE'}<ArrowDown size={14}/></a></div>

      <section id="projects" className="section shell"><div className="section-heading"><div><p className="eyebrow">{c.workLabel}</p><h2>{c.workTitle}</h2></div><p>{c.workIntro}</p></div><div className="featured-grid">
        <article className="featured-project lens-project"><div className="project-visual lens-visual" aria-hidden="true"><div className="visual-window"><div className="window-top"><span><i/><i/><i/></span><small>LensOS / workspace</small><Coffee size={15}/></div><div className="lens-demo"><div className="lens-side"><Coffee size={22}/><b>LensOS<span>CAFFE MANAGEMENT</span></b><i/><i/><i/></div><div className="lens-workflow"><small>CAFFE LENS</small><h3>{c.connected}</h3><div className="workflow-steps"><span><Database size={20}/>{c.warehouse}</span><ArrowRight size={15}/><span><Coffee size={20}/>{c.cafe}</span><ArrowRight size={15}/><span><Layers size={20}/>{c.ledger}</span></div><div className="demo-lines"><i/><i/><i/></div></div></div></div></div><div className="project-content"><div className="project-category"><span>{c.lensCategory}</span><span className="status-dot">{c.progress}</span></div><h3><Link href="/projects/lens-caffe-system">Lens Caffe System<ArrowUpRight size={25}/></Link></h3><p>{c.lensDesc}</p><div className="tag-list">{['React','TypeScript','Express','PostgreSQL','Prisma'].map(t => <span key={t}>{t}</span>)}</div><div className="project-actions"><a href={`${github}/Lens-Caffe-System`} target="_blank" rel="noopener noreferrer"><Github size={16}/>{c.source}<ArrowUpRight size={15}/></a><a href="/projects/lens-caffe-system">{c.overview}<ArrowRight size={15}/></a></div></div></article>
        <article className="featured-project portal-project"><div className="project-visual portal-visual" aria-hidden="true"><div className="paper-preview"><div className="paper-top"><span>NEZAVISNI INFORMATIVNI PORTAL</span><Newspaper size={17}/></div><div className="paper-masthead">građanski<span>.ba</span></div><div className="paper-rule"/><p>{c.portalNote}</p><div className="paper-columns"><div/><div/><div/></div><div className="paper-bottom">INDEPENDENT PUBLISHING<ArrowUpRight size={20}/></div></div></div><div className="project-content"><div className="project-category"><span>{c.portalCategory}</span><span>{c.portalStatus}</span></div><h3><Link href="/projects/gradanski">gradanski.ba<ArrowUpRight size={25}/></Link></h3><p>{c.portalDesc}</p><div className="tag-list"><span>{language === 'en' ? 'News & media' : 'Vijesti i mediji'}</span><span>{language === 'en' ? 'Independent project' : 'Vlastiti projekt'}</span></div><div className="project-actions"><a href="https://gradanski.ba" target="_blank" rel="noopener noreferrer">{c.visit}<ArrowUpRight size={16}/></a><a href="/projects/gradanski">{c.overview}<ArrowRight size={15}/></a></div></div></article>
      </div><div className="more-heading"><h3>{c.more}</h3><div className="project-filters" aria-label={language === 'en' ? 'Filter projects' : 'Filtriraj projekte'}>{[['all',c.all],['web',c.web],['systems',c.systems]].map(([id,label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div></div><div className="work-grid" aria-live="polite">{moreProjects.filter(p => filter === 'all' || p.type === filter).map(project => <article className="work-card" key={project.repo}><div className="work-card-top"><span className="project-number">{String(moreProjects.indexOf(project)+3).padStart(2,'0')}</span><div><a href={`${github}/${project.repo}`} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — GitHub`}><Github size={18}/></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${language === 'en' ? 'Play' : 'Igraj'}`}><ArrowUpRight size={19}/></a>}</div></div><h4><a href={`${github}/${project.repo}`} target="_blank" rel="noopener noreferrer">{project.name}<ArrowUpRight size={16}/></a></h4><p>{project[language]}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><a href={github} className="all-github" target="_blank" rel="noopener noreferrer">{language === 'en' ? 'Find more on GitHub' : 'Više na GitHubu'}<ArrowUpRight size={17}/></a></section>

      <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">{c.aboutLabel}</p><h2>{c.aboutTitle}</h2><div className="about-mark" aria-hidden="true">&lt;ab /&gt;</div></div><div className="about-copy"><p>{c.aboutText}</p><p>{c.aboutText2}</p><div className="about-facts"><div><span className="eyebrow">{c.education}</span><h3>{c.educationValue}</h3><p>{c.educationNote}</p></div><div><span className="eyebrow">{c.experience}</span><h3>{c.experienceValue}</h3><p>{c.experienceNote}</p></div></div></div></div></section>
      <section id="skills" className="section shell"><div className="section-heading"><div><p className="eyebrow">{c.skillsLabel}</p><h2>{c.skillsTitle}</h2></div><p>{c.skillsIntro}</p></div><div className="skills-grid">{[
        {title:c.frontend,icon:Code2,items:['React','Next.js','TypeScript','HTML & CSS','Tailwind CSS']},
        {title:c.backend,icon:Database,items:['Node.js','Express','PostgreSQL','Prisma','REST APIs']},
        {title:c.lowlevel,icon:Cpu,items:['C','Python','MIPS Assembly','Data structures','Computer architecture']},
        {title:c.quality,icon:Layers,items:['Git & GitHub','Vitest','Playwright','API testing','Responsive design']},
      ].map(({title,icon:Icon,items}) => <div className="skill-group" key={title}><Icon size={24}/><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
      <section id="terminal" className="section chat-section shell"><div><p className="eyebrow">{c.chatLabel}</p><h2>{c.chatTitle}</h2><p>{c.chatIntro}</p><span className="chat-decoration" aria-hidden="true">hello, world<span>_</span></span></div><PortfolioChat/></section>
      <section id="contact" className="contact-section"><div className="shell"><p className="eyebrow">{c.contactLabel}</p><div className="contact-grid"><div><h2>{c.contactTitle}<br/><span>{c.contactAccent}</span></h2><p>{c.contactText}</p><a href={`mailto:${email}`} className="button button-gold">{language === "en" ? "Open email app" : "Otvori email aplikaciju"}<ArrowUpRight size={18}/></a><a className="gmail-option" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Portfolio%20enquiry`} target="_blank" rel="noopener noreferrer">{language === "en" ? "Or compose in Gmail" : "Ili napiši poruku u Gmailu"}<ArrowUpRight size={14}/></a></div><div className="contact-details"><div className="availability"><span/>{c.available}</div><div className="email-line"><a href={`mailto:${email}`}>{email}</a><button onClick={copyAddress} aria-label={c.copyEmail}>{copyState === 'copied' ? <Check size={18}/> : <Copy size={18}/>}</button></div><p className="copy-status" role="status">{copyState === 'copied' ? c.copied : copyState === 'error' ? c.copyFailed : ''}</p><a href={github} target="_blank" rel="noopener noreferrer"><Github size={17}/>GitHub<ArrowUpRight size={16}/></a><a href={linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/>LinkedIn<ArrowUpRight size={16}/></a><p className="contact-location"><MapPin size={15}/>{c.location}</p></div></div></div></section>
    </main><footer className="shell site-footer"><a href="#top" className="footer-name">Adin Brkić<span className="gold">.</span></a><span>© {new Date().getFullYear()} · {c.footer}</span><a href="#top">{c.back}<ArrowUpRight size={15}/></a></footer>
  </div>;
}
