"use client";

import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "success";
  content: string;
}

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about      - Learn about Adin",
    "  skills     - View technical skills",
    "  projects   - List featured projects",
    "  contact    - Get contact info",
    "  football   - A fun surprise",
    "  clear      - Clear terminal",
    "  neofetch   - System info",
  ],
  about: [
    "",
    "  ╔═══════════════════════════════════════════╗",
    "  ║            ADIN BRKIC                     ║",
    "  ║        Software Engineer                  ║",
    "  ╚═══════════════════════════════════════════╝",
    "",
    "  Specializing in systems programming,",
    "  simulations, and web engineering.",
    "",
    "  Background in management & hospitality",
    "  gives me strong user & business sense.",
    "",
    "  When not coding, watching football! ⚽",
    "",
  ],
  skills: [
    "",
    "  Technical Skills:",
    "  ─────────────────────────────────────",
    "  Languages   : Python, JS, TS, C, MIPS ASM",
    "  Frontend    : React, Next.js, Tailwind CSS",
    "  Backend     : Node.js, REST APIs, SQL",
    "  Systems     : Cache, MMU, Pipeline Design",
    "  Tools       : Git, Linux, VS Code, Docker",
    "",
  ],
  projects: [
    "",
    "  Featured Projects:",
    "  ─────────────────────────────────────",
    "  1. Lens Caffe QR Menu  [Next.js, React]",
    "  2. Currency Converter  [MIPS ASM + Python]",
    "  3. Cache Simulator     [HTML/CSS/JS]",
    "  4. MMU Simulator       [Systems Programming]",
    "  5. Pipeline Simulator  [CPU Architecture]",
    "  6. React Web Portal    [News Platform]",
    "",
    '  Visit github.com/Brega0302 for more!',
    "",
  ],
  contact: [
    "",
    "  Contact Information:",
    "  ─────────────────────────────────────",
    "  Email    : adin.brkic0302@gmail.com",
    "  GitHub   : github.com/Brega0302",
    "  LinkedIn : linkedin.com/in/adin-brkic-6971472b8",
    "",
    "  Feel free to reach out!",
    "",
  ],
  football: [
    "",
    "        ⚽  GOOOOOAL!  ⚽",
    "",
    "      \\o/",
    "       |",
    "      / \\",
    "",
    "  Football is not just a sport,",
    "  it's a way of life!",
    "",
    "  Favorite teams? Ask me sometime!",
    "",
  ],
  neofetch: [
    "",
    "        ████████████████          adin@portfolio",
    "      ██              ██          ──────────────────",
    "    ██    ██████████    ██        OS: Developer Linux x86_64",
    "  ██    ██          ██    ██      Host: Portfolio v2.0",
    "  ██  ██  ████████  ██    ██      Kernel: Next.js 16",
    "  ██  ██  ██    ██  ██    ██      Uptime: Always Learning",
    "  ██  ██  ████████  ██    ██      Shell: TypeScript",
    "  ██    ██          ██    ██      DE: React + Framer Motion",
    "    ██    ██████████    ██        Memory: Unlimited Ideas",
    "      ██              ██          Hobby: Football ⚽",
    "        ████████████████          ",
    "",
  ],
};

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: "output",
      content: 'Welcome to Adin\'s Terminal! Type "help" for commands.',
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lineCounter, setLineCounter] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let newLines: TerminalLine[] = [
      { id: lineCounter, type: "input", content: `$ ${cmd}` },
    ];
    let newLineCounter = lineCounter + 1;

    if (trimmedCmd === "clear") {
      setLines([]);
      setLineCounter(1);
      setCurrentInput("");
      return;
    }

    if (trimmedCmd === "") {
      setLines((prev) => [...prev, ...newLines]);
      setLineCounter(newLineCounter);
      setCurrentInput("");
      return;
    }

    const result = COMMANDS[trimmedCmd];

    if (result) {
      const outputLines = Array.isArray(result) ? result : [result];
      outputLines.forEach((line) => {
        newLines.push({ id: newLineCounter++, type: "output", content: line });
      });
    } else {
      newLines.push({
        id: newLineCounter++,
        type: "error",
        content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setLineCounter(newLineCounter);
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
        {/* Terminal Header */}
        <div className="bg-secondary/80 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" 
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer" 
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-green-400 cursor-pointer" 
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">
            adin@portfolio ~ bash
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          onClick={focusInput}
          className="bg-background/50 p-4 h-80 overflow-y-auto font-mono text-sm cursor-text"
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={`${
                  line.type === "input"
                    ? "text-primary"
                    : line.type === "error"
                      ? "text-red-400"
                      : line.type === "success"
                        ? "text-green-400"
                        : "text-muted-foreground"
                } whitespace-pre-wrap`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <div className="flex items-center text-primary mt-1">
            <span className="mr-2 text-accent">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-primary text-foreground"
              autoFocus
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-4 bg-primary ml-0.5"
            />
          </div>
        </div>

        {/* Quick commands hint */}
        <div className="bg-secondary/50 px-4 py-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Try: <span className="text-primary">help</span> • <span className="text-primary">about</span> • <span className="text-primary">football</span> • <span className="text-primary">neofetch</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
