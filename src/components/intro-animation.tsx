"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("text"), 1500);
    const timer2 = setTimeout(() => setStage("exit"), 3500);
    const timer3 = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "exit" ? null : (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "exit" ? 0 : 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: Math.floor(Math.random() * 100) + '%',
                top: Math.floor(Math.random() * 100) + '%',
              }}
              animate={{
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: stage === "exit" ? 0.8 : 1, 
            rotate: 0,
            y: stage === "text" ? -20 : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.8
          }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 blur-3xl bg-primary/40 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.6, 0.4] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <Image
              src="/images/logo.png"
              alt="AB Logo"
              width={180}
              height={180}
              className="drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Name and title */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: stage === "text" || stage === "exit" ? 1 : 0, 
            y: stage === "text" || stage === "exit" ? 0 : 30 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Adin Brkic
          </motion.h1>
          <motion.p
            className="mt-3 text-muted-foreground text-lg tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "text" ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            Software Engineer
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="absolute bottom-20 w-48 h-0.5 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
