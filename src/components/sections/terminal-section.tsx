"use client";

import { motion } from "framer-motion";
import { PortfolioChat } from "@/src/components/ui/portfolio-chat";
import { useLanguage } from "@/src/context/language-context";

export function TerminalSection() {
  const { t } = useLanguage();
  
  return (
    <section id="terminal" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full font-mono text-sm mb-4"
          >
            {t.chat.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.chat.title}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t.chat.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {t.chat.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PortfolioChat />
        </motion.div>
      </div>
    </section>
  );
}
