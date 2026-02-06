"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { BentoCard } from "./bento-grid";

export function TerminalCard() {
  return (
    <BentoCard className="bg-card/50 backdrop-blur">
      <div className="flex flex-col h-full min-h-[180px]">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">terminal</span>
        </div>
        
        <div className="flex-1 font-mono text-xs space-y-1">
          <div className="text-muted-foreground">
            <span className="text-primary">$</span> whoami
          </div>
          <div className="text-foreground">adin_brkic</div>
          <div className="text-muted-foreground">
            <span className="text-primary">$</span> cat skills.txt
          </div>
          <div className="text-foreground">systems, web, AI</div>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-primary"
          >
            _
          </motion.div>
        </div>
        
        <a
          href="#terminal"
          className="text-xs text-primary hover:underline mt-auto inline-flex items-center gap-1"
        >
          Try Interactive Terminal
        </a>
      </div>
    </BentoCard>
  );
}
