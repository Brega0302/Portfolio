"use client";

import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        // Only handle valid hash links (not just "#")
        if (href && href.length > 1 && href.startsWith("#")) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
