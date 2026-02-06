"use client";

import React from "react"

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = ["#ff6b35", "#f7c59f", "#e8a87c", "#c38d9e"];

function generateSparkle(): Sparkle {
  return {
    id: `${Date.now()}-${Math.random()}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </svg>
  );
}

export function Sparkles({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback(() => {
    const sparkle = generateSparkle();
    setSparkles((prev) => [...prev, sparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, 750);
  }, []);

  useEffect(() => {
    const interval = setInterval(addSparkle, 400);
    return () => clearInterval(interval);
  }, [addSparkle]);

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <SparkleIcon size={sparkle.size} color={sparkle.color} />
          </motion.span>
        ))}
      </AnimatePresence>
      <strong className="relative z-10 font-bold">{children}</strong>
    </span>
  );
}

export function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      size: Math.floor(Math.random() * 4) + 2,
      duration: Math.floor(Math.random() * 10) + 10,
      delay: Math.floor(Math.random() * 5),
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
