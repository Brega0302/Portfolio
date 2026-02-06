"use client";

import { motion } from "framer-motion";

export function AnimatedFootball({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Football/Soccer ball */}
      <circle cx="50" cy="50" r="48" fill="#fff" stroke="#1a1a2e" strokeWidth="2" />
      
      {/* Pentagon patterns */}
      <path
        d="M50 15 L65 35 L58 55 L42 55 L35 35 Z"
        fill="#1a1a2e"
      />
      <path
        d="M20 45 L35 35 L42 55 L30 70 L15 60 Z"
        fill="#1a1a2e"
      />
      <path
        d="M80 45 L85 60 L70 70 L58 55 L65 35 Z"
        fill="#1a1a2e"
      />
      <path
        d="M42 55 L58 55 L65 75 L50 85 L35 75 Z"
        fill="#1a1a2e"
      />
      
      {/* Subtle gradient overlay */}
      <defs>
        <radialGradient id="ballGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ballGradient)" />
    </motion.svg>
  );
}

export function BouncingFootball({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#fff" stroke="#1a1a2e" strokeWidth="2" />
        <path d="M50 15 L65 35 L58 55 L42 55 L35 35 Z" fill="#1a1a2e" />
        <path d="M20 45 L35 35 L42 55 L30 70 L15 60 Z" fill="#1a1a2e" />
        <path d="M80 45 L85 60 L70 70 L58 55 L65 35 Z" fill="#1a1a2e" />
        <path d="M42 55 L58 55 L65 75 L50 85 L35 75 Z" fill="#1a1a2e" />
        <defs>
          <radialGradient id="ballGradient2" cx="30%" cy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#ballGradient2)" />
      </svg>
    </motion.div>
  );
}
