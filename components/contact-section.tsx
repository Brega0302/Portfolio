"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Send } from "lucide-react";
import { AnimatedFootball } from "./animated-football";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:adin.brkic0302@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    label: "adin.brkic0302@gmail.com",
    color: "hover:border-primary/50 hover:bg-primary/5",
  },
  {
    name: "GitHub",
    href: "https://github.com/Brega0302",
    icon: <Github className="w-5 h-5" />,
    label: "github.com/Brega0302",
    color: "hover:border-accent/50 hover:bg-accent/5",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adin-brkic-6971472b8/",
    icon: <Linkedin className="w-5 h-5" />,
    label: "linkedin.com/in/adin-brkic",
    color: "hover:border-blue-400/50 hover:bg-blue-400/5",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background football */}
      <div className="absolute bottom-10 right-10 opacity-5">
        <AnimatedFootball className="w-64 h-64" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
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
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-mono text-sm mb-4"
          >
            Contact
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"Let's Build Something Great"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {"I'm always excited to work on new projects and collaborate with awesome people. Drop me a message!"}
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="say-hello-btn"
            onClick={() => {
              window.open('mailto:adin.brkic0302@gmail.com?subject=Hello!&body=Hi Adin, I came across your portfolio and would like to connect.');
            }}
          >
            Say Hello
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all ${link.color}`}
            >
              <div className="p-3 bg-secondary rounded-xl text-foreground group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-muted-foreground">{link.name}</div>
                <div className="text-foreground font-medium truncate">{link.label}</div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>
          ))}
        </motion.div>

        {/* Fun footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-8">
            When not coding, you will find me watching football or exploring new tech.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Adin Brkic. Crafted with{" "}
            <span className="text-primary">Next.js</span>,{" "}
            <span className="text-accent">Framer Motion</span> &{" "}
            <span className="text-primary">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
