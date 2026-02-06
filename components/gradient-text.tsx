"use client";

import React from "react"

import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function GradientText({
  children,
  className = "",
  gradient = "from-[#ff6b35] via-[#f7c59f] to-[#ff6b35]",
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export function WavyText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.05,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
