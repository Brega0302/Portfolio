"use client";

import React from "react"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Cpu, Terminal, Globe, Layers, Workflow, QrCode } from "lucide-react";
import type { Project } from "@/src/data/projects";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/src/animations/variants";

const iconMap: Record<string, React.ReactNode> = {
  "lens-caffe-qr-menu": <QrCode className="w-8 h-8" />,
  "currency-converter": <Terminal className="w-8 h-8" />,
  "cache-simulator": <Cpu className="w-8 h-8" />,
  "mmu-simulator": <Layers className="w-8 h-8" />,
  "pipeline-simulator": <Workflow className="w-8 h-8" />,
  "react-web-portal": <Globe className="w-8 h-8" />,
};

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={staggerItem} className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
              {iconMap[project.id] || <Cpu className="w-8 h-8" />}
            </div>
            <div>
              <span className="text-primary font-mono text-sm uppercase tracking-wider block mb-1">
                {project.category === "fullstack" ? "Full Stack" : project.category === "systems" ? "Systems" : "Web"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {project.title}
              </h1>
            </div>
          </motion.div>

          <motion.p variants={staggerItem} className="text-xl text-muted-foreground leading-relaxed">
            {project.longDescription}
          </motion.p>

          {/* Links */}
          <motion.div variants={staggerItem} className="flex gap-4 mt-6">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.header>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* The Challenge */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              The Challenge
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          </motion.section>

          {/* The Solution */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              The Solution
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          </motion.section>

          {/* What I Learned */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              What I Learned
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.learned}
              </p>
            </div>
          </motion.section>

          {/* Technologies */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="px-4 py-2 bg-secondary text-foreground font-mono text-sm rounded-lg"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Interested in working together?
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
