"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { MagneticElement } from "@/src/components/ui/magnetic-element";

const socialLinks = [
  { name: "Email", href: "mailto:adin.brkic0302@gmail.com", icon: Mail },
  { name: "GitHub", href: "https://github.com/Brega0302", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/adin-brkic-6971472b8/", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="AB"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-semibold text-foreground">Adin Brkic</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <MagneticElement key={link.name} strength={0.3}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-magnetic
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-secondary border border-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              </MagneticElement>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Adin Brkic.
          </p>
        </div>
      </div>
    </footer>
  );
}
