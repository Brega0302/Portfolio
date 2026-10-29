"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface CodeSnippet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface TerminalWindow {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  opacity: number;
  lines: number;
}

interface CircuitLine {
  points: { x: number; y: number }[];
  opacity: number;
  glowPhase: number;
  vertical: boolean;
}

interface Hexagon {
  x: number;
  y: number;
  size: number;
  opacity: number;
  phase: number;
}

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Binary Rain
    class BinaryRain {
      columns: number;
      drops: number[];
      chars: string;

      constructor() {
        this.columns = Math.floor(width / 20);
        this.drops = [];
        this.chars = '01';
        for (let i = 0; i < this.columns; i++) {
          this.drops[i] = Math.random() * height;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = '15px Courier New';
        
        for (let i = 0; i < this.drops.length; i++) {
          const char = this.chars[Math.floor(Math.random() * this.chars.length)];
          const x = i * 20;
          const y = this.drops[i];

          const gradient = ctx.createLinearGradient(x, y - 20, x, y);
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
          gradient.addColorStop(1, 'rgba(0, 255, 159, 0.8)');
          
          ctx.fillStyle = gradient;
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            this.drops[i] = 0;
          }
          this.drops[i] += 20;
        }
      }
    }

    // Code Snippets
    class CodeSnippetSystem {
      snippets: CodeSnippet[];

      constructor() {
        this.snippets = [];
        const texts = [
          'function()', 'const =>', 'return {}', 'if (true)', 'class {}',
          'async/await', 'import *', 'export {}', '<Component/>', 'npm install',
          'git commit', 'docker run', 'SELECT *', 'API call', 'console.log',
          '{ ...state }', 'try/catch', 'map()', 'filter()', 'reduce()'
        ];
        
        for (let i = 0; i < 25; i++) {
          this.snippets.push({
            text: texts[Math.floor(Math.random() * texts.length)],
            x: Math.random() * width,
            y: -20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 0.5 + 0.3,
            fontSize: Math.random() * 8 + 10,
            opacity: Math.random() * 0.3 + 0.1,
            rotation: (Math.random() - 0.5) * 0.2,
            rotationSpeed: (Math.random() - 0.5) * 0.01
          });
        }
      }

      update() {
        this.snippets.forEach(snippet => {
          snippet.y += snippet.vy;
          snippet.rotation += snippet.rotationSpeed;
          
          if (snippet.y > height + 50) {
            snippet.y = -20;
            snippet.x = Math.random() * width;
          }
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        
        this.snippets.forEach(snippet => {
          ctx.save();
          ctx.translate(snippet.x, snippet.y);
          ctx.rotate(snippet.rotation);
          ctx.font = `${snippet.fontSize}px Courier New`;
          ctx.fillStyle = `rgba(0, 212, 255, ${snippet.opacity})`;
          ctx.fillText(snippet.text, 0, 0);
          ctx.restore();
        });
      }
    }

    // Circuit Lines
    class CircuitSystem {
      lines: CircuitLine[];

      constructor() {
        this.lines = [];
        for (let i = 0; i < 15; i++) {
          const line: CircuitLine = {
            points: [],
            opacity: Math.random() * 0.1 + 0.05,
            glowPhase: Math.random() * Math.PI * 2,
            vertical: Math.random() > 0.5
          };

          const numPoints = Math.floor(Math.random() * 3) + 3;
          
          if (line.vertical) {
            const x = Math.random() * width;
            for (let i = 0; i < numPoints; i++) {
              line.points.push({
                x: x + (Math.random() - 0.5) * 100,
                y: (height / numPoints) * i
              });
            }
          } else {
            const y = Math.random() * height;
            for (let i = 0; i < numPoints; i++) {
              line.points.push({
                x: (width / numPoints) * i,
                y: y + (Math.random() - 0.5) * 100
              });
            }
          }
          
          this.lines.push(line);
        }
      }

      update() {
        this.lines.forEach(line => {
          line.glowPhase += 0.02;
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        
        this.lines.forEach(line => {
          const glow = Math.sin(line.glowPhase) * 0.5 + 0.5;
          
          ctx.beginPath();
          ctx.moveTo(line.points[0].x, line.points[0].y);
          
          for (let i = 1; i < line.points.length; i++) {
            ctx.lineTo(line.points[i].x, line.points[i].y);
          }
          
          ctx.strokeStyle = `rgba(0, 255, 159, ${line.opacity * (0.5 + glow * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw nodes
          line.points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 159, ${line.opacity * 2})`;
            ctx.fill();
          });
        });
      }
    }

    // Terminal Windows
    class TerminalSystem {
      terminals: TerminalWindow[];

      constructor() {
        this.terminals = [];
        for (let i = 0; i < 3; i++) {
          this.terminals.push({
            x: Math.random() * (width - 250),
            y: Math.random() * (height - 150),
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            width: Math.random() * 200 + 150,
            height: Math.random() * 100 + 80,
            opacity: Math.random() * 0.1 + 0.05,
            lines: Math.floor(Math.random() * 3) + 2
          });
        }
      }

      update() {
        this.terminals.forEach(terminal => {
          terminal.x += terminal.vx;
          terminal.y += terminal.vy;

          if (terminal.x < 0 || terminal.x > width - terminal.width) terminal.vx *= -1;
          if (terminal.y < 0 || terminal.y > height - terminal.height) terminal.vy *= -1;
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        
        this.terminals.forEach(terminal => {
          // Window background
          ctx.fillStyle = `rgba(15, 23, 42, ${terminal.opacity})`;
          ctx.fillRect(terminal.x, terminal.y, terminal.width, terminal.height);

          // Window border
          ctx.strokeStyle = `rgba(0, 212, 255, ${terminal.opacity * 2})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(terminal.x, terminal.y, terminal.width, terminal.height);

          // Title bar
          ctx.fillStyle = `rgba(0, 212, 255, ${terminal.opacity * 1.5})`;
          ctx.fillRect(terminal.x, terminal.y, terminal.width, 20);

          // Terminal dots
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(terminal.x + 10 + i * 15, terminal.y + 10, 3, 0, Math.PI * 2);
            const colors = ['255, 95, 86', '255, 189, 46', '39, 201, 63'];
            ctx.fillStyle = `rgba(${colors[i]}, ${terminal.opacity * 3})`;
            ctx.fill();
          }

          // Code lines
          ctx.font = '10px Courier New';
          ctx.fillStyle = `rgba(0, 255, 159, ${terminal.opacity * 2})`;
          for (let i = 0; i < terminal.lines; i++) {
            const lineY = terminal.y + 35 + i * 15;
            ctx.fillText('> executing_code...', terminal.x + 10, lineY);
          }
        });
      }
    }

    // Hexagon Grid
    class HexagonGrid {
      hexagons: Hexagon[];

      constructor() {
        this.hexagons = [];
        const hexSize = 40;
        const rows = Math.ceil(height / (hexSize * 1.5)) + 2;
        const cols = Math.ceil(width / (hexSize * Math.sqrt(3))) + 2;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * hexSize * Math.sqrt(3) + (row % 2) * hexSize * Math.sqrt(3) / 2;
            const y = row * hexSize * 1.5;
            
            if (Math.random() > 0.7) {
              this.hexagons.push({
                x, y,
                size: hexSize,
                opacity: Math.random() * 0.05 + 0.02,
                phase: Math.random() * Math.PI * 2
              });
            }
          }
        }
      }

      update() {
        this.hexagons.forEach(hex => {
          hex.phase += 0.01;
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return;
        
        this.hexagons.forEach(hex => {
          const glow = Math.sin(hex.phase) * 0.5 + 0.5;
          
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = hex.x + hex.size * Math.cos(angle);
            const y = hex.y + hex.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${hex.opacity * (0.5 + glow * 0.5)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }
    }

    // Initialize all systems
    const binaryRain = new BinaryRain();
    const codeSnippets = new CodeSnippetSystem();
    const circuitLines = new CircuitSystem();
    const terminals = new TerminalSystem();
    const hexagonGrid = new HexagonGrid();
    
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Don't clear completely for trail effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw all systems
      hexagonGrid.update();
      hexagonGrid.draw(ctx);

      circuitLines.update();
      circuitLines.draw(ctx);

      binaryRain.draw(ctx);

      terminals.update();
      terminals.draw(ctx);

      codeSnippets.update();
      codeSnippets.draw(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasWidth = canvasRef.current.width = window.innerWidth;
        canvasHeight = canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <MatrixBackground />;
}
