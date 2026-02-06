"use client";

import React from "react"

import { motion } from "framer-motion";
import { Github, Cpu, Terminal, Globe, Layers, Workflow } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "./bento-grid";
import type { Project } from "@/src/data/projects";

const iconMap: Record<string, React.ReactNode> = {
  "currency-converter": <Terminal className="w-5 h-5" />,
  "cache-simulator": <Cpu className="w-5 h-5" />,
  "mmu-simulator": <Layers className="w-5 h-5" />,
  "pipeline-simulator": <Workflow className="w-5 h-5" />,
  "react-web-portal": <Globe className="w-5 h-5" />,
};

interface ProjectMiniCardProps {
  project: Project;
  delay?: number;
}

export function ProjectMiniCard({ project, delay = 0 }: ProjectMiniCardProps) {
  return (
    <BentoCard delay={delay} gradient={`bg-gradient-to-br ${project.color}`} className="group">
      <div className="flex flex-col h-full min-h-[180px]">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
            {iconMap[project.id] || <Cpu className="w-5 h-5" />}
          </div>
          
          {project.links?.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-secondary text-xs font-mono text-muted-foreground rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 2 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{project.technologies.length - 2}
            </span>
          )}
        </div>
        
        <Link
          href={`/projects/${project.id}`}
          className="mt-3 text-primary text-xs font-medium hover:underline inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View Details
        </Link>
      </div>
    </BentoCard>
  );
}
