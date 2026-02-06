"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, QrCode } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "./bento-grid";
import type { Project } from "@/src/data/projects";

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <BentoCard colSpan={2} gradient={`bg-gradient-to-br ${project.color}`} className="group">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <span className="text-primary font-mono text-xs uppercase tracking-wider">Featured</span>
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary text-xs font-mono text-muted-foreground rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.id}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            Read Case Study
          </Link>
          
          <div className="flex gap-2">
            {project.links?.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg text-foreground transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.links?.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-primary text-primary-foreground rounded-lg"
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
