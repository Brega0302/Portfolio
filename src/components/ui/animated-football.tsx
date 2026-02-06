"use client";

import { motion } from "framer-motion";

export function AnimatedFootball({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Football SVG */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10"
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Ball base */}
        <defs>
          <radialGradient id="ballGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#d0d0d0" />
          </radialGradient>
          <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
        </defs>
        
        {/* Main ball */}
        <circle cx="50" cy="50" r="45" fill="url(#ballGradient)" stroke="#ccc" strokeWidth="1" />
        
        {/* Pentagon patches - soccer ball pattern */}
        <g fill="url(#pentagonGradient)">
          {/* Center pentagon */}
          <polygon points="50,25 60,38 56,52 44,52 40,38" />
          {/* Top */}
          <polygon points="50,5 58,18 50,25 42,18" />
          {/* Top right */}
          <polygon points="72,22 75,36 60,38 58,18" />
          {/* Bottom right */}
          <polygon points="80,55 72,70 56,52 60,38 75,36" />
          {/* Bottom */}
          <polygon points="56,52 72,70 50,80 28,70 44,52" />
          {/* Bottom left */}
          <polygon points="28,70 20,55 25,36 40,38 44,52" />
          {/* Top left */}
          <polygon points="25,36 28,22 42,18 40,38" />
        </g>
        
        {/* Highlight */}
        <ellipse cx="35" cy="35" rx="12" ry="8" fill="white" opacity="0.3" />
      </motion.svg>
    </motion.div>
  );
}
