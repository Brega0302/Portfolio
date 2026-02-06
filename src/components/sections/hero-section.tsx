"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { MagneticElement } from "@/src/components/ui/magnetic-element";
import { useLanguage } from "@/src/context/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated grid - pinned to section top-left */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">{t.hero.available}</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground block">{t.hero.greeting}</span>
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient block"
              >
                {t.hero.name}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <MagneticElement strength={0.2}>
                <motion.button
                  onClick={() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  data-magnetic
                  className="group px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full inline-flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.hero.viewWork}
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </MagneticElement>

              <MagneticElement strength={0.2}>
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  data-magnetic
                  className="px-6 py-3 border border-primary/30 text-foreground font-semibold rounded-full inline-flex items-center gap-2 hover:bg-primary/10 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.hero.getInTouch}
                </motion.button>
              </MagneticElement>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{t.hero.findMe}</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: "https://github.com/Brega0302", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/adin-brkic-6971472b8/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:adin.brkic0302@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <MagneticElement key={label} strength={0.3}>
                    <motion.a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-magnetic
                      className="w-10 h-10 rounded-full bg-secondary border border-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  </MagneticElement>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end -mt-8 lg:-mt-16"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
            </div>

            {/* Image container with floating animation */}
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Decorative ring - outer */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Decorative ring - middle with dots */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ filter: "blur(8px)" }}
              />

              {/* Profile image */}
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20"
                whileHover={{ 
                  boxShadow: "0 0 60px rgba(212, 175, 55, 0.5)",
                  borderColor: "rgba(212, 175, 55, 0.6)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/images/viber-image-2024-10-25-19-37-55-805.png"
                  alt="Adin Brkic"
                  fill
                  className="object-cover object-[center_30%]"
                  priority
                />
                
                {/* Shine effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
