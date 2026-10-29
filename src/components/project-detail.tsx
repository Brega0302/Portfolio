"use client";
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Coffee, Newspaper } from 'lucide-react';
import type { Project } from '@/src/data/projects';
import { useLanguage } from '@/src/context/language-context';

const bosnian: Record<string, {intro:string; problem:string; solution:string; learned:string}> = {
 'lens-caffe-system': {
  intro:'LensOS povezuje magacin, nabavke, izdavanje robe u kafić i knjigu pazara za dvije smjene. Projekt je u aktivnom razvoju i još nije završen produkcijski sistem.',
  problem:'Magacinsko stanje, roba u kafiću i prebrojavanje po smjenama trebaju biti povezani da bi se dnevna prodaja mogla dosljedno obračunavati.',
  solution:'React i TypeScript interfejs, Express API i PostgreSQL baza kroz Prisma. Implementirani su prijava vlasnika, transakcijske promjene zaliha, upozorenja o minimalnoj zalihi i obračun prodaje iz početnog stanja, dopuna i završnog brojanja.',
  learned:'Rad s relacionim podacima, transakcijama, historijskim cijenama, sesijama i automatizovanim testovima. Slijede pristup za konobare, otpis robe, izvještaji i priprema za udaljeni rad.'
 },
 'gradanski': {
  intro:'gradanski.ba je moj nezavisni informativni portal. Projekt povezuje moja interesovanja za digitalno izdavaštvo i razvoj prisustva na webu.',
  problem:'Razvijati nezavisan izdavački projekt s jasnim identitetom i dostupnim online prisustvom.',
  solution:'Vlasnik sam portala gradanski.ba i razvijam ga kao vlastiti digitalni projekt.',
  learned:'Praktično iskustvo s nezavisnim digitalnim projektom i odnosom sadržaja i njegovog prikaza na webu.'
 }
};

export function ProjectDetail({project}: {project:Project}) {
 const {language,setLanguage}=useLanguage();
 const bs=language==='bs';
 const local=bs ? bosnian[project.id] : undefined;
 const sections=[
  [bs?'Izazov':'The challenge',local?.problem ?? project.problem],
  [bs?'Rješenje':'The solution',local?.solution ?? project.solution],
  [bs?'Iskustvo i naredni koraci':'Learning and next steps',local?.learned ?? project.learned],
 ];
 return <div className="portfolio detail-page">
  <header className="shell detail-nav"><Link href="/#projects"><ArrowLeft size={17}/>{bs?'Nazad na projekte':'Back to projects'}</Link><div className="language-control">{(['en','bs'] as const).map(l=><button key={l} aria-pressed={l===language} onClick={()=>setLanguage(l)}>{l.toUpperCase()}</button>)}</div></header>
  <main className="shell detail-main">
   <p className="eyebrow">{bs?'ODABRANI PROJEKT':'SELECTED PROJECT'} / {project.category.toUpperCase()}</p>
   <div className="detail-heading">{project.id==='gradanski'?<Newspaper size={30}/>:<Coffee size={30}/>}<h1>{project.title}</h1></div>
   {project.id==='lens-caffe-system' && <span className="detail-status">{bs?'U aktivnom razvoju':'In active development'}</span>}
   <p className="detail-intro">{local?.intro ?? project.longDescription}</p>
   <div className="detail-actions">{project.links?.github && <a className="button button-gold" href={project.links.github} target="_blank" rel="noopener noreferrer"><Github size={16}/>{bs?'Pogledaj kod':'View source'}<ArrowUpRight size={16}/></a>}{project.links?.live && <a className="button button-gold" href={project.links.live} target="_blank" rel="noopener noreferrer">{bs?'Posjeti stranicu':'Visit website'}<ArrowUpRight size={16}/></a>}<Link href="/#contact" className="button button-outline">{bs?'Kontaktiraj me':'Get in touch'}<ArrowRight size={16}/></Link></div>
   <div className="detail-sections">{sections.map(([title,text],i)=><section key={title}><span className="eyebrow">0{i+1}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div>
   <section className="detail-tools"><h2>{bs?'Tehnologije i područja rada':'Technologies and focus'}</h2><div className="tag-list">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></section>
   <div className="detail-footer"><Link href="/#projects"><ArrowLeft size={16}/>{bs?'Ostali projekti':'Explore other projects'}</Link><Link href="/#contact">{bs?'Razgovarajmo':'Let’s talk'}<ArrowUpRight size={16}/></Link></div>
  </main>
 </div>;
}
