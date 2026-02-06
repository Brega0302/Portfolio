"use client";

import React from "react"

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { BentoCard } from "./bento-grid";
import { socialLinks } from "@/src/data/personal";

const iconMap: Record<string, React.ReactNode> = {
  Email: <Mail className="w-4 h-4" />,
  GitHub: <Github className="w-4 h-4" />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
};

export function ContactCard() {
  return (
    <BentoCard colSpan={2} className="bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {"Let's Connect"}
        </h3>
        
        <div className="grid gap-3 flex-1">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors group"
            >
              <div className="p-2 bg-secondary rounded-lg text-foreground">
                {iconMap[link.name]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{link.name}</div>
                <div className="text-sm text-foreground font-medium truncate">{link.label}</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
