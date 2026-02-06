"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Database, Wrench, Cpu, Terminal } from "lucide-react";
import { TiltCard } from "@/src/components/ui/tilt-card";
import { useLanguage } from "@/src/context/language-context";

const skillCategories = [
  {
    nameKey: "languages",
    icon: Code2,
    skills: ["C", "JavaScript", "TypeScript", "Python", "MIPS Assembly"],
    color: "from-primary/20 to-primary/5",
  },
  {
    nameKey: "frontend",
    icon: Globe,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
    color: "from-accent/20 to-accent/5",
  },
  {
    nameKey: "backend",
    icon: Database,
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
    color: "from-primary/15 to-accent/15",
  },
  {
    nameKey: "systems",
    icon: Cpu,
    skills: ["Operating Systems", "Computer Architecture", "Memory Management", "Cache Systems"],
    color: "from-accent/20 to-primary/10",
  },
  {
    nameKey: "tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Linux", "Docker"],
    color: "from-primary/20 to-accent/20",
  },
  {
    nameKey: "other",
    icon: Terminal,
    skills: ["Problem Solving", "Data Structures", "Algorithms", "Team Collaboration"],
    color: "from-accent/15 to-primary/15",
  },
];

export function SkillsSection() {
  const { t } = useLanguage();
  
  return (
    <section id="skills" className="py-24 px-6 relative">
      {/* Background */}
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
            {t.skills.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.skills.title}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t.skills.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.skills.description}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className={`group relative h-full bg-gradient-to-br ${category.color} rounded-xl p-[1px]`}>
                  <div className="h-full bg-card rounded-xl p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{t.skills[category.nameKey as keyof typeof t.skills]}</h3>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 text-sm bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
