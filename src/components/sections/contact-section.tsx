"use client";

import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { MagneticElement } from "@/src/components/ui/magnetic-element";
import { useLanguage } from "@/src/context/language-context";

const contactLinks = [
  {
    icon: Mail,
    labelKey: "email",
    value: "adin.brkic0302@gmail.com",
    href: "mailto:adin.brkic0302@gmail.com",
  },
  {
    icon: Github,
    labelKey: "github",
    value: "github.com/Brega0302",
    href: "https://github.com/Brega0302",
  },
  {
    icon: Linkedin,
    labelKey: "linkedin",
    value: "Adin Brkic",
    href: "https://www.linkedin.com/in/adin-brkic-6971472b8/",
  },
];

export function ContactSection() {
  const { t } = useLanguage();
  
  const getLabel = (key: string) => {
    if (key === "email") return t.contact.email;
    if (key === "github") return "GitHub";
    if (key === "linkedin") return "LinkedIn";
    return key;
  };
  
  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      
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
            {t.contact.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.contact.title}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t.contact.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex justify-center"
        >
          <MagneticElement strength={0.2}>
            <motion.a
              href="mailto:adin.brkic0302@gmail.com"
              data-magnetic
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold text-lg shadow-xl shadow-primary/20"
            >
              <Send className="w-5 h-5" />
              {t.contact.sayHello}
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.labelKey}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(212, 175, 55, 0.5)" }}
              className="group flex flex-col items-center gap-3 p-6 bg-card border border-primary/10 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{getLabel(link.labelKey)}</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors text-sm">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t.contact.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
