"use client";

import React from "react"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    color: "from-primary to-orange-400",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "C", level: 75 },
      { name: "MIPS Assembly", level: 70 },
    ],
  },
  {
    name: "Frontend",
    color: "from-accent to-pink-400",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    name: "Backend & Systems",
    color: "from-blue-400 to-cyan-400",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 80 },
      { name: "Cache Design", level: 85 },
      { name: "Memory Mgmt", level: 80 },
      { name: "SQL", level: 70 },
    ],
  },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="text-xs text-muted-foreground font-mono"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
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
            className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full font-mono text-sm mb-4"
          >
            Skills
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What I Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A blend of low-level systems knowledge and modern web development skills,
            always learning something new.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <TiltCard key={category.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 h-full"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      color={category.color}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Also familiar with</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Git", "Linux", "VS Code", "Figma", "Terminal", "Docker", "PostgreSQL", "Firebase"].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-4 py-2 bg-secondary text-muted-foreground rounded-xl font-medium hover:text-foreground hover:bg-secondary/80 transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
