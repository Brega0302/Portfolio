"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/language-context";
import { MagneticElement } from "./magnetic-element";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
      <MagneticElement strength={0.2}>
        <motion.button
          onClick={() => setLanguage("en")}
          data-magnetic
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
      </MagneticElement>
      <MagneticElement strength={0.2}>
        <motion.button
          onClick={() => setLanguage("bs")}
          data-magnetic
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            language === "bs"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BS
        </motion.button>
      </MagneticElement>
    </div>
  );
}
