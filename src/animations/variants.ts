'use client';

import type { Variants, Transition } from "framer-motion";

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0.5 },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Stagger children
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400 },
};

export const hoverLift = {
  y: -5,
  transition: { type: "spring", stiffness: 400 },
};

export const tapScale = {
  scale: 0.95,
};

// Card hover with tilt
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { type: "spring", stiffness: 300 },
  },
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Sliding animations
export const slideInFromBottom: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

export const slideInFromTop: Variants = {
  hidden: { y: "-100%" },
  visible: { y: 0 },
};

// Floating animation
export const floating = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const floatingRotate = {
  y: [0, -10, 0],
  rotate: [0, 5, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Continuous rotation
export const rotate360: Transition = {
  rotate: 360,
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "linear",
  },
};

// Pulse animation
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Page transitions
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Spring configurations
export const springBouncy = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

export const springSmooth = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const springStiff = {
  type: "spring",
  stiffness: 500,
  damping: 25,
};

// Viewport settings
export const viewportOnce = { once: true, margin: "-100px" };
export const viewportAlways = { once: false, margin: "-50px" };
