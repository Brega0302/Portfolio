"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { MagneticElement } from "@/src/components/ui/magnetic-element";
import { LanguageSwitcher } from "@/src/components/ui/language-switcher";
import { useLanguage } from "@/src/context/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.chat, href: "#terminal" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const sections = ["about", "projects", "skills", "terminal", "contact"];
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <nav
        className={cn(
          "max-w-5xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border border-primary/10 shadow-lg shadow-primary/5"
            : "bg-transparent"
        )}
      >
        {/* Logo - Updated via Cursor AI */}
        <MagneticElement strength={0.2}>
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
          >
            <Image
              src="/images/logo.png"
              alt="AB"
              width={44}
              height={44}
              className="rounded-lg"
            />
          </motion.a>
        </MagneticElement>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <MagneticElement strength={0.15}>
                <a
                  href={link.href}
                  data-magnetic
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full block",
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {activeSection === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              </MagneticElement>
            </li>
          ))}
        </ul>

        {/* Desktop CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <MagneticElement strength={0.2}>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              data-magnetic
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold rounded-full cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.letsTalk}
            </motion.button>
          </MagneticElement>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden max-w-5xl mx-auto mt-2"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-primary/10 p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl transition-colors text-center",
                    activeSection === link.href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-2 flex justify-center">
              <LanguageSwitcher />
            </li>
            <li className="pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="block w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl text-center font-semibold cursor-pointer"
              >
                {t.nav.letsTalk}
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}
