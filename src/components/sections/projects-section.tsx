"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, QrCode, Cpu, HardDrive, GitBranch, Layers, Newspaper, Database } from "lucide-react";
import { TiltCard } from "@/src/components/ui/tilt-card";
import { MagneticElement } from "@/src/components/ui/magnetic-element";
import { useLanguage } from "@/src/context/language-context";

const projectsData = [
  {
    id: "news-portal",
    titleKey: "newsTitle",
    descKey: "newsDesc",
    tags: ["Next.js", "React", "TypeScript", "CMS"],
    icon: Newspaper,
    featured: true,
    gradient: "from-accent/20 to-primary/20",
    link: "https://github.com/Brega0302/News-Portal",
  },
  {
    id: "lens-caffe",
    titleKey: "lensTitle",
    descKey: "lensDesc",
    tags: ["Next.js", "React", "Tailwind CSS", "QR Integration"],
    icon: QrCode,
    featured: true,
    gradient: "from-primary/20 to-accent/20",
    link: "https://github.com/Brega0302/Lens-Caffe-QR-menu",
  },
  {
    id: "cache-simulator",
    titleKey: "cacheTitle",
    descKey: "cacheDesc",
    tags: ["C", "Systems Programming", "Memory Management"],
    icon: Cpu,
    featured: true,
    gradient: "from-primary/20 to-primary/5",
    link: "https://github.com/Brega0302/Advanced-Cache-Simulator",
  },
  {
    id: "mmu-simulator",
    titleKey: "mmuTitle",
    descKey: "mmuDesc",
    tags: ["C", "Operating Systems", "Virtual Memory"],
    icon: HardDrive,
    featured: false,
    gradient: "from-accent/20 to-primary/10",
    link: "https://github.com/Brega0302/Advanced-Cache-Simulator",
  },
  {
    id: "pipeline-simulator",
    titleKey: "pipelineTitle",
    descKey: "pipelineDesc",
    tags: ["C", "Computer Architecture", "RISC-V"],
    icon: GitBranch,
    featured: false,
    gradient: "from-primary/15 to-accent/15",
    link: "https://github.com/Brega0302/Advanced-Cache-Simulator",
  },
  {
    id: "playwright",
    titleKey: "playwrightTitle",
    descKey: "playwrightDesc",
    tags: ["TypeScript", "Software Testing", "Playwright"],
    icon: GitBranch,
    featured: false,
    gradient: "from-accent/15 to-primary/20",
    link: "https://github.com/Brega0302/Playwright",
  },
  {
    id: "healthcare",
    titleKey: "healthcareTitle",
    descKey: "healthcareDesc",
    tags: ["SQL", "Database Design", "Healthcare Systems"],
    icon: Database,
    featured: false,
    gradient: "from-primary/20 to-accent/10",
    link: "https://github.com/Brega0302/Healthcare",
  },
  {
    id: "currency-converter",
    titleKey: "currencyTitle",
    descKey: "currencyDesc",
    tags: ["MIPS Assembly", "Low-Level Programming"],
    icon: Layers,
    featured: false,
    gradient: "from-accent/20 to-primary/20",
    link: "https://github.com/Brega0302/Currency-Converter",
  },
];

export function ProjectsSection() {
  const { t } = useLanguage();
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full font-mono text-sm mb-4"
          >
            {t.projects.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.projects.title}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t.projects.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Featured Projects - Large Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`group relative h-full bg-gradient-to-br ${project.gradient} rounded-2xl p-[1px] overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-full bg-card rounded-2xl p-6 md:p-8">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <project.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t.projects[project.titleKey as keyof typeof t.projects]}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.projects[project.descKey as keyof typeof t.projects]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-all duration-200 border border-primary/20 hover:border-primary/30"
                    >
                      <Github className="w-4 h-4" />
                      {t.projects.viewCode}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects - Smaller Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group relative h-full bg-card border border-primary/10 hover:border-primary/30 rounded-xl p-5 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <project.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.projects[project.titleKey as keyof typeof t.projects]}
                    </h3>
                    {/* Hover link - next to title */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto w-7 h-7 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-200 border border-primary/20 hover:border-primary/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {t.projects[project.descKey as keyof typeof t.projects]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
