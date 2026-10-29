export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  learned: string;
  technologies: string[];
  category: "systems" | "web" | "fullstack";
  color: string;
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
  images?: string[];
}

export const projects: Project[] = [
  {
    id: "lens-caffe-system",
    title: "Lens Caffe System",
    description: "A full-stack café management application. Work in progress — actively developing and improving.",
    longDescription: "LensOS connects warehouse stock, purchasing, warehouse-to-café transfers and a two-shift daily sales ledger. This ongoing personal project is based on practical café workflows; it is not a finished production release.",
    problem: "Warehouse stock, goods in the café and shift counts need to stay connected so that daily sales can be calculated consistently.",
    solution: "React and TypeScript interfaces backed by Express, PostgreSQL and Prisma. Implemented owner authentication, transactional stock updates, low-stock alerts and a ledger that calculates sales from opening counts, transfers and closing counts.",
    learned: "Working with relational data, transactions, historical pricing, session authentication and automated tests. Further work includes waiter permissions, write-offs, reporting and deployment hardening.",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Vitest", "Playwright"],
    category: "fullstack", color: "from-emerald-800 to-stone-700", featured: true,
    links: { github: "https://github.com/Brega0302/Lens-Caffe-System" },
  },
  {
    id: "gradanski",
    title: "gradanski.ba",
    description: "My independent online news portal and digital publishing project.",
    longDescription: "gradanski.ba is my independent online news portal. It brings together my interests in digital publishing and building an online presence.",
    problem: "Developing an independent digital publishing project with a clear identity and an accessible online presence.",
    solution: "Own and run gradanski.ba as a personal online news portal.",
    learned: "Practical experience with an independent digital project and the relationship between content and its presentation on the web.",
    technologies: ["Digital publishing", "News & media"], category: "web",
    color: "from-stone-600 to-amber-700", featured: true,
    links: { live: "https://gradanski.ba" },
  },
  {
    id: "lens-caffe-qr-menu",
    title: "Lens Caffe QR Menu",
    description:
      "Interactive QR-based digital ordering system for Lens Caffe, allowing customers to browse menu and place orders seamlessly.",
    longDescription:
      "A complete digital transformation of the traditional cafe ordering experience. This system allows customers to scan a QR code at their table, browse the full menu with images and descriptions, customize their orders, and submit them directly to the kitchen - all from their smartphone.",
    problem:
      "Traditional paper menus were inefficient, hard to update, and needed a modern, contactless solution for better customer experience in the post-pandemic world.",
    solution:
      "Built a responsive web app with QR code integration, real-time menu management dashboard for staff, and instant order notifications to the kitchen.",
    learned:
      "Full-stack development, QR code integration, real-time order management, responsive design for various devices, and building production-ready hospitality solutions.",
    technologies: ["Next.js", "React", "Tailwind CSS", "QR Codes", "REST APIs", "PostgreSQL"],
    category: "fullstack",
    color: "from-orange-500 to-amber-400",
    featured: true,
    links: {
      github: "https://github.com/Brega0302/Lens-Caffe-QR-menu",
    },
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    description:
      "A full-stack currency converter with MIPS Assembly backend and Python GUI frontend.",
    longDescription:
      "This project demonstrates the bridge between low-level assembly programming and high-level application development. The core conversion logic runs in MIPS Assembly for optimal performance, while a user-friendly Python GUI makes it accessible to end users.",
    problem:
      "Needed to demonstrate low-level programming skills while creating a practical, user-friendly application that bridges assembly with modern interfaces.",
    solution:
      "Implemented the conversion algorithms in MIPS Assembly for performance, then created a Python wrapper with Tkinter GUI for user interaction.",
    learned:
      "Deep understanding of MIPS architecture, register management, memory operations, and bridging assembly with high-level languages through FFI.",
    technologies: ["MIPS Assembly", "Python", "Tkinter", "GUI Design", "FFI"],
    category: "systems",
    color: "from-pink-500 to-rose-400",
    links: {
      github: "https://github.com/Brega0302/Currency-Converter",
    },
  },
  {
    id: "cache-simulator",
    title: "Cache Simulator",
    description:
      "Interactive web-based cache memory simulator with visual representations of cache operations.",
    longDescription:
      "An educational tool that brings complex cache memory concepts to life through interactive visualizations. Users can configure cache parameters, run memory access sequences, and watch in real-time as the cache handles hits, misses, and evictions.",
    problem:
      "Cache memory concepts are abstract and difficult to grasp from textbooks alone. Students needed a visual, interactive way to understand cache behavior.",
    solution:
      "Built a web-based simulator with animated visualizations of cache operations, supporting different replacement policies and cache configurations.",
    learned:
      "Cache replacement policies (LRU, FIFO, Random), direct-mapped vs set-associative vs fully-associative caches, and creating effective educational simulations.",
    technologies: ["HTML", "CSS", "JavaScript", "Canvas API", "Algorithms"],
    category: "systems",
    color: "from-cyan-500 to-blue-400",
    links: {
      github: "https://github.com/Brega0302/Advanced-Cache-Simulator",
    },
  },
  {
    id: "mmu-simulator",
    title: "MMU Simulator",
    description:
      "Memory Management Unit simulator demonstrating virtual to physical address translation.",
    longDescription:
      "A comprehensive simulator that visualizes how modern operating systems translate virtual addresses to physical memory locations. Features page table visualization, TLB operations, and page fault handling.",
    problem:
      "Virtual memory and address translation are fundamental OS concepts that are hard to visualize and understand without hands-on experience.",
    solution:
      "Created an interactive simulator showing the complete address translation process with step-by-step visualization of page tables and TLB lookups.",
    learned:
      "Page tables structures (single and multi-level), TLB operation and importance, address translation algorithms, and page fault handling strategies.",
    technologies: ["JavaScript", "Data Structures", "Algorithms", "HTML/CSS"],
    category: "systems",
    color: "from-emerald-500 to-green-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    id: "pipeline-simulator",
    title: "Instruction Pipeline Simulator",
    description:
      "Visual simulator showing CPU instruction pipeline stages and hazard detection.",
    longDescription:
      "A detailed visualization of how modern CPUs execute instructions in a pipelined fashion. Shows all five pipeline stages, detects data and control hazards, and demonstrates forwarding and stalling techniques.",
    problem:
      "CPU pipelining with hazard detection is one of the most challenging concepts in computer architecture, requiring visualization to truly understand.",
    solution:
      "Built a step-by-step simulator that shows instructions flowing through IF, ID, EX, MEM, and WB stages with hazard detection and resolution visualization.",
    learned:
      "Pipeline stages and their purposes, data hazards and forwarding, control hazards and branch prediction, and the performance impact of pipeline stalls.",
    technologies: ["JavaScript", "HTML/CSS", "CPU Architecture", "Algorithms"],
    category: "systems",
    color: "from-yellow-500 to-orange-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    id: "react-web-portal",
    title: "React Web Portal",
    description:
      "Modern news and content platform built with React, featuring real-time updates and responsive design.",
    longDescription:
      "A fast, modern content delivery platform designed for optimal user experience. Features include lazy loading, infinite scroll, content categorization, and a clean reading experience optimized for both mobile and desktop.",
    problem:
      "Needed a fast, modern content delivery platform that provides excellent user experience across all devices and handles dynamic content efficiently.",
    solution:
      "Built with React best practices, implemented efficient state management, API caching, and progressive loading for optimal performance.",
    learned:
      "React patterns and best practices, efficient state management, API integration strategies, responsive design systems, and performance optimization.",
    technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS", "SWR"],
    category: "web",
    color: "from-indigo-500 to-purple-400",
    links: {
      github: "https://github.com/Brega0302/News-Portal",
    },
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getProjectsByCategory = (category: Project["category"]): Project[] => {
  return projects.filter((p) => p.category === category);
};
