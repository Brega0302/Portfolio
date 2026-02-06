"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, FloatingParticles } from "./sparkles";
import { GradientText } from "./gradient-text";
import { BouncingFootball } from "./animated-football";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 opacity-10">
        <BouncingFootball className="w-32 h-32" />
      </div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Profile Image with playful frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative shrink-0"
          >
            {/* Colorful border effect */}
            <div className="absolute -inset-3 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl opacity-75 blur-sm" />
            <div className="absolute -inset-3 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl animate-pulse opacity-50" />
            
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border-4 border-card">
              <Image
                src="/images/viber-image-2024-10-25-19-37-55-805.png"
                alt="Adin Brkic - Software Engineer"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            
            {/* Playful floating badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg font-semibold text-sm"
            >
              Available for work
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-muted-foreground font-mono text-sm mb-4 block">
                Hey there! I am
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                <GradientText>Adin Brkic</GradientText>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                A <Sparkles>Software Engineer</Sparkles> who builds
                <br className="hidden md:block" /> systems that actually matter.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              I specialize in <span className="text-primary font-medium">systems programming</span>,{" "}
              <span className="text-accent font-medium">simulations</span>, and{" "}
              <span className="text-primary font-medium">web engineering</span>. 
              My background in management and hospitality gives me a unique eye for 
              user experience and business needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                See My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-card border-2 border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-colors"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Fun fact with football */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center gap-3 justify-center lg:justify-start text-muted-foreground"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="48" fill="#fff" stroke="currentColor" strokeWidth="3" />
                  <path d="M50 15 L65 35 L58 55 L42 55 L35 35 Z" fill="currentColor" />
                  <path d="M20 45 L35 35 L42 55 L30 70 L15 60 Z" fill="currentColor" />
                  <path d="M80 45 L85 60 L70 70 L58 55 L65 35 Z" fill="currentColor" />
                </svg>
              </motion.div>
              <span className="text-sm">Football enthusiast when not coding</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
