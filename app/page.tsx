"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { ScrollProgress } from "@/src/components/layout/scroll-progress";
import { HeroSection } from "@/src/components/sections/hero-section";
import { ProjectsSection } from "@/src/components/sections/projects-section";
import { SkillsSection } from "@/src/components/sections/skills-section";
import { TerminalSection } from "@/src/components/sections/terminal-section";
import { ContactSection } from "@/src/components/sections/contact-section";
import { IntroAnimation } from "@/src/components/intro-animation";
import { CursorFollower } from "@/src/components/ui/cursor-follower";
import { ShaderBackground } from "@/src/components/ui/shader-background";
import { useSmoothScroll } from "@/src/hooks/use-smooth-scroll";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useSmoothScroll();

  useEffect(() => {
    // Check if intro has been shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
      setIsLoaded(true);
      // Scroll to top when returning to page
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsLoaded(true);
    sessionStorage.setItem("hasSeenIntro", "true");
    // Scroll to top (hero/about section) after intro - use setTimeout to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {isLoaded && (
        <>
          <ShaderBackground />
          <CursorFollower />
          <ScrollProgress />
          <Navbar />
          
          <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <TerminalSection />
            <ContactSection />
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}
