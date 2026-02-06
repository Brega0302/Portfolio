"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Cpu, Terminal, Globe, Layers, Workflow, QrCode } from "lucide-react";

interface Project {
  title: string;
  description: string;
  problem: string;
  learned: string;
  technologies: string[];
  icon: React.ReactNode;
  color: string;
  links?: {
    github?: string;
    live?: string;
  };
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Lens Caffe QR Menu",
    description:
      "Interactive QR-based digital ordering system for Lens Caffe, allowing customers to browse menu and place orders seamlessly.",
    problem:
      "Traditional paper menus were inefficient and needed a modern, contactless solution for better customer experience.",
    learned:
      "Full-stack development, QR code integration, real-time order management, and building production-ready hospitality solutions.",
    technologies: ["Next.js", "React", "Tailwind CSS", "QR Codes", "REST APIs"],
    icon: <QrCode className="w-6 h-6" />,
    color: "from-primary to-orange-400",
    featured: true,
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    title: "Currency Converter",
    description:
      "A full-stack currency converter with MIPS Assembly backend and Python GUI frontend.",
    problem:
      "Needed to demonstrate low-level programming skills while creating a practical, user-friendly application.",
    learned:
      "Deep understanding of MIPS architecture, register management, and bridging assembly with high-level languages.",
    technologies: ["MIPS Assembly", "Python", "Tkinter", "GUI Design"],
    icon: <Terminal className="w-6 h-6" />,
    color: "from-accent to-pink-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    title: "Cache Simulator",
    description:
      "Interactive web-based cache memory simulator with visual representations of cache operations.",
    problem:
      "Educational tool needed to visualize complex cache memory concepts for computer architecture students.",
    learned:
      "Cache replacement policies (LRU, FIFO), direct-mapped vs associative caches, and browser-based simulations.",
    technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
    icon: <Cpu className="w-6 h-6" />,
    color: "from-blue-400 to-cyan-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    title: "MMU Simulator",
    description:
      "Memory Management Unit simulator demonstrating virtual to physical address translation.",
    problem:
      "Complex memory management concepts needed visual, interactive demonstration for better understanding.",
    learned:
      "Page tables, TLB operations, address translation algorithms, and memory hierarchy concepts.",
    technologies: ["JavaScript", "Data Structures", "Algorithms"],
    icon: <Layers className="w-6 h-6" />,
    color: "from-green-400 to-emerald-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    title: "Instruction Pipeline Simulator",
    description:
      "Visual simulator showing CPU instruction pipeline stages and hazard detection.",
    problem:
      "Pipeline concepts like hazards, stalls, and forwarding are abstract and hard to visualize.",
    learned:
      "Pipeline stages (IF, ID, EX, MEM, WB), data hazards, control hazards, and forwarding techniques.",
    technologies: ["JavaScript", "HTML/CSS", "CPU Architecture"],
    icon: <Workflow className="w-6 h-6" />,
    color: "from-yellow-400 to-orange-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
  {
    title: "React Web Portal",
    description:
      "Modern news and content platform built with React, featuring real-time updates and responsive design.",
    problem:
      "Needed a fast, modern content delivery platform with excellent user experience.",
    learned:
      "React best practices, state management, API integration, and responsive design patterns.",
    technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS"],
    icon: <Globe className="w-6 h-6" />,
    color: "from-purple-400 to-indigo-400",
    links: {
      github: "https://github.com/Brega0302",
    },
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-mono text-sm mb-4"
          >
            My Work
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Things I have Built
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of projects showcasing my expertise in systems programming, 
            simulations, and modern web development.
          </p>
        </motion.div>

        {/* Featured Project - Lens Caffe */}
        {projects.filter(p => p.featured).map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-card border border-border rounded-3xl p-8 md:p-10 overflow-hidden group"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                    {project.icon}
                  </div>
                  <div>
                    <span className="text-primary font-mono text-sm">Featured Project</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
                  {project.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <span className="text-primary font-mono text-sm block mb-2">The Challenge</span>
                    <p className="text-muted-foreground text-sm">{project.problem}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <span className="text-accent font-mono text-sm block mb-2">What I Learned</span>
                    <p className="text-muted-foreground text-sm">{project.learned}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-secondary text-sm font-mono text-muted-foreground rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.links?.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl text-foreground transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.links?.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-primary text-primary-foreground rounded-xl"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full bg-card border border-border rounded-2xl p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-xs font-mono text-muted-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
