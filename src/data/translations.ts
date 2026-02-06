export type Language = "en" | "bs";

export const translations = {
  en: {
    // Navbar
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      chat: "Chat",
      contact: "Contact",
      letsTalk: "Let's Talk",
    },
    // Hero
    hero: {
      available: "Available for work",
      greeting: "Hi, I'm",
      name: "Adin Brkic",
      description: "A passionate Software Engineer specializing in systems programming, web development, and building elegant solutions to complex problems.",
      softwareEngineer: "Software Engineer",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
      findMe: "Find me on",
    },
    // Projects
    projects: {
      badge: "Portfolio",
      title: "Featured",
      titleHighlight: "Projects",
      description: "A showcase of my work in systems programming, simulations, and web development.",
      viewCode: "View Code",
      lensTitle: "Lens Caffe QR Menu",
      lensDesc: "Digital ordering menu system with QR code integration for seamless restaurant experience.",
      newsTitle: "News Portal",
      newsDesc: "Modern news portal web application with fast content delivery and intuitive user experience.",
      cacheTitle: "Cache Simulator",
      cacheDesc: "Educational tool simulating CPU cache behavior with different mapping strategies and replacement policies.",
      mmuTitle: "MMU Simulator",
      mmuDesc: "Memory Management Unit simulator implementing virtual memory, page tables, and TLB caching.",
      pipelineTitle: "Pipeline Simulator",
      pipelineDesc: "RISC-V pipeline simulator with hazard detection, data forwarding, and branch prediction.",
      currencyTitle: "Currency Converter",
      currencyDesc: "Real-time currency converter built in MIPS Assembly, demonstrating low-level programming skills.",
      healthcareTitle: "Healthcare Management System",
      healthcareDesc: "Comprehensive healthcare database system with patient management and medical records.",
      playwrightTitle: "Playwright Testing",
      playwrightDesc: "Software testing and maintenance project using Playwright framework.",
    },
    // Skills
    skills: {
      badge: "Expertise",
      title: "Skills &",
      titleHighlight: "Technologies",
      description: "A blend of low-level systems knowledge and modern web development expertise.",
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      systems: "Systems",
      tools: "Tools",
      other: "Other",
    },
    // Terminal (section id kept for nav)
    terminal: {
      badge: "Interactive",
      title: "Try My",
      titleHighlight: "Terminal",
      description: "Type 'help' to see available commands and explore my portfolio interactively.",
    },
    // Chat / AI Assistant
    chat: {
      badge: "AI Assistant",
      title: "Chat with",
      titleHighlight: "Adin",
      cardTitle: "AI Assistant",
      description: "Ask me anything about my experience, projects, skills, or how to get in touch.",
      placeholder: "Ask me anything about Adin — projects, skills, or how to get in touch.",
      inputPlaceholder: "Ask about projects, skills, contact...",
      apiError: "Add OPENAI_API_KEY to .env.local to enable the AI.",
    },
    // Contact
    contact: {
      badge: "Get In Touch",
      title: "Let's Work",
      titleHighlight: "Together",
      description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      sayHello: "Say Hello",
      email: "Email",
      location: "Based in Bosnia and Herzegovina",
    },
    // Footer
    footer: {
      rights: "All rights reserved.",
    },
  },
  bs: {
    // Navbar
    nav: {
      about: "O meni",
      projects: "Projekti",
      skills: "Vještine",
      chat: "Chat",
      contact: "Kontakt",
      letsTalk: "Razgovarajmo",
    },
    // Hero
    hero: {
      available: "Dostupan za posao",
      greeting: "Zdravo, ja sam",
      name: "Adin Brkic",
      description: "Strastven softverski inženjer specijaliziran za sistemsko programiranje, web razvoj i kreiranje elegantnih rješenja za složene probleme.",
      softwareEngineer: "Softverski Inženjer",
      viewWork: "Pogledaj Radove",
      getInTouch: "Kontaktiraj Me",
      findMe: "Pronađi me na",
    },
    // Projects
    projects: {
      badge: "Portfolio",
      title: "Istaknuti",
      titleHighlight: "Projekti",
      description: "Prikaz mojih radova u sistemskom programiranju, simulacijama i web razvoju.",
      viewCode: "Pogledaj Kod",
      lensTitle: "Lens Caffe QR Meni",
      lensDesc: "Digitalni sistem za naručivanje sa QR kod integracijom za besprijekorno restoranski doživljaj.",
      newsTitle: "Novinski Portal",
      newsDesc: "Moderni novinski web portal sa brzom isporukom sadržaja i intuitivnim korisničkim iskustvom.",
      cacheTitle: "Cache Simulator",
      cacheDesc: "Edukativni alat koji simulira ponašanje CPU cache memorije sa različitim strategijama mapiranja.",
      mmuTitle: "MMU Simulator",
      mmuDesc: "Simulator jedinice za upravljanje memorijom koji implementira virtualnu memoriju i tabele stranica.",
      pipelineTitle: "Pipeline Simulator",
      pipelineDesc: "RISC-V pipeline simulator sa detekcijom hazarda, prosljeđivanjem podataka i predikcijom grananja.",
      currencyTitle: "Konverter Valuta",
      currencyDesc: "Konverter valuta u realnom vremenu napravljen u MIPS Assembly jeziku.",
      healthcareTitle: "Sistem za Upravljanje Zdravstvom",
      healthcareDesc: "Kompletna zdravstvena baza podataka sa upravljanjem pacijentima i medicinskim kartonima.",
      playwrightTitle: "Playwright Testiranje",
      playwrightDesc: "Projekt testiranja softvera i održavanja korišćenjem Playwright frameworka.",
    },
    // Skills
    skills: {
      badge: "Ekspertiza",
      title: "Vještine i",
      titleHighlight: "Tehnologije",
      description: "Kombinacija znanja o sistemima niskog nivoa i moderne web razvoj ekspertize.",
      languages: "Jezici",
      frontend: "Frontend",
      backend: "Backend",
      systems: "Sistemi",
      tools: "Alati",
      other: "Ostalo",
    },
    // Terminal (section id kept for nav)
    terminal: {
      badge: "Interaktivno",
      title: "Isprobaj Moj",
      titleHighlight: "Terminal",
      description: "Ukucaj 'help' da vidiš dostupne komande i istraži moj portfolio interaktivno.",
    },
    // Chat / AI Assistant
    chat: {
      badge: "AI Asistent",
      title: "Razgovaraj sa",
      titleHighlight: "Adinom",
      cardTitle: "AI Asistent",
      description: "Pitaj me bilo šta o mom iskustvu, projektima, vještinama ili kako da me kontaktiraš.",
      placeholder: "Pitaj me bilo šta o Adinu — projektima, vještinama ili kontaktu.",
      inputPlaceholder: "Pitaj o projektima, vještinama, kontaktu...",
      apiError: "Dodaj OPENAI_API_KEY u .env.local da omogućiš AI.",
    },
    // Contact
    contact: {
      badge: "Kontaktiraj Me",
      title: "Radimo",
      titleHighlight: "Zajedno",
      description: "Uvijek sam otvoren za razgovor o novim projektima, kreativnim idejama ili prilikama da budem dio vaše vizije.",
      sayHello: "Pozdrav",
      email: "Email",
      location: "Lociram se u Bosni i Hercegovini",
    },
    // Footer
    footer: {
      rights: "Sva prava zadržana.",
    },
  },
};
