"use client";

import { motion } from "framer-motion";
import { InteractiveTerminal } from "./interactive-terminal";

export function TerminalSection() {
  return (
    <section id="terminal" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-secondary text-foreground rounded-full font-mono text-sm mb-4"
          >
            Interactive
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Try My Terminal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A playful way to explore my portfolio. Type commands to learn more about me!
          </p>
        </motion.div>

        <InteractiveTerminal />
      </div>
    </section>
  );
}
