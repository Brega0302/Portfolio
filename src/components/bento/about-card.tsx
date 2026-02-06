"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BentoCard } from "./bento-grid";
import { personalInfo } from "@/src/data/personal";

export function AboutCard() {
  return (
    <BentoCard colSpan={2} rowSpan={2} className="group">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Profile Image */}
        <div className="relative shrink-0">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl opacity-75 blur-sm" />
            <div className="relative w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden border-4 border-card">
              <Image
                src="/images/viber-image-2024-10-25-19-37-55-805.png"
                alt={`${personalInfo.name} - ${personalInfo.title}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            
            {personalInfo.available && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-semibold shadow-lg"
              >
                Available
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground font-mono text-sm mb-2">
            Hey there! I am
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {personalInfo.name}
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-4">
            {personalInfo.title} who builds systems that actually matter.
          </p>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            I specialize in <span className="text-primary font-medium">systems programming</span>,{" "}
            <span className="text-accent font-medium">simulations</span>, and{" "}
            <span className="text-primary font-medium">web engineering</span>. 
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
