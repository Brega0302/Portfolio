"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./bento-grid";
import type { SkillCategory } from "@/src/data/skills";

interface SkillCardProps {
  category: SkillCategory;
  delay?: number;
}

export function SkillCard({ category, delay = 0 }: SkillCardProps) {
  return (
    <BentoCard delay={delay}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
        <h3 className="text-sm font-semibold text-foreground">
          {category.name}
        </h3>
      </div>
      
      <div className="space-y-3">
        {category.skills.map((skill, skillIndex) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">{skill.name}</span>
              <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + skillIndex * 0.05, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
