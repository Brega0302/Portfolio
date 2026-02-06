"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/src/animations/variants";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  gradient?: string;
  hover?: boolean;
  delay?: number;
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  gradient,
  hover = true,
  delay = 0,
  ...props
}: BentoCardProps) {
  const colSpanClasses = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
  };

  const rowSpanClasses = {
    1: "row-span-1",
    2: "row-span-2",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      className={cn(
        "relative bg-card border border-border rounded-2xl p-6 overflow-hidden transition-colors",
        hover && "hover:border-primary/30",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      {...(props as MotionProps)}
    >
      {gradient && (
        <div
          className={cn(
            "absolute inset-0 opacity-5 transition-opacity",
            hover && "group-hover:opacity-10",
            gradient
          )}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
