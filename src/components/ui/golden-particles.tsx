"use client";

import { useEffect, useRef } from "react";

export function GoldenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: width / 2, y: height / 2, radius: 300, isOver: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseEnter = () => {
      mouse.isOver = true;
      mouse.radius = 400;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
      mouse.radius = 300;
    };

    class GoldParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originalRadius: number;
      pulsePhase: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2.5 + 0.5;
        this.originalRadius = this.radius;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.6 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          const forceMultiplier = mouse.isOver ? 0.5 : 0.3;
          this.vx -= Math.cos(angle) * force * forceMultiplier;
          this.vy -= Math.sin(angle) * force * forceMultiplier;
          const radiusMultiplier = mouse.isOver ? 3 : 2;
          this.radius = this.originalRadius * (1 + force * radiusMultiplier);
        } else {
          this.radius += (this.originalRadius - this.radius) * 0.1;
        }

        this.vx *= 0.99;
        this.vy *= 0.99;
        this.pulsePhase += mouse.isOver ? 0.08 : 0.03;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${this.opacity * pulse * 0.6})`);
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${this.opacity * pulse * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * pulse})`;
        ctx.fill();
      }
    }

    class GoldDust {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      opacity: number = 0;
      sway: number = 0;
      swaySpeed: number = 0;
      swayOffset: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -10;
        this.speed = Math.random() * 0.5 + 0.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.sway = Math.random() * 2 - 1;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        this.swayOffset += this.swaySpeed;
        this.x += Math.sin(this.swayOffset) * this.sway;
        if (this.y > height + 10) this.reset();
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.fill();
      }
    }

    class GoldenWave {
      yPos: number;
      speed: number;
      amplitude: number;
      frequency: number;
      opacity: number;
      offset: number;

      constructor(yPos: number, speed: number, amplitude: number, frequency: number, opacity: number) {
        this.yPos = yPos;
        this.speed = speed;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.opacity = opacity;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.offset += this.speed;
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.moveTo(0, this.yPos);
        for (let x = 0; x <= width; x += 5) {
          const y = this.yPos + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255, 165, 0, ${this.opacity * 0.3})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }

    class GoldenOrb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 120 + 80;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.08 * pulse})`);
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${0.04 * pulse})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawGoldenConnections = (particles: GoldParticle[]) => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - distance / 150) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const goldParticles: GoldParticle[] = [];
    for (let i = 0; i < 100; i++) goldParticles.push(new GoldParticle());

    const goldDust: GoldDust[] = [];
    for (let i = 0; i < 80; i++) goldDust.push(new GoldDust());

    const waves: GoldenWave[] = [
      new GoldenWave(height * 0.3, 0.01, 30, 0.003, 0.15),
      new GoldenWave(height * 0.5, 0.015, 40, 0.0025, 0.1),
      new GoldenWave(height * 0.7, 0.008, 25, 0.004, 0.12),
    ];

    const orbs: GoldenOrb[] = [];
    for (let i = 0; i < 4; i++) orbs.push(new GoldenOrb());

    const animate = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      orbs.forEach(orb => { orb.update(); orb.draw(); });
      waves.forEach(wave => { wave.update(); wave.draw(); });
      goldDust.forEach(dust => { dust.update(); dust.draw(); });
      drawGoldenConnections(goldParticles);
      goldParticles.forEach(p => { p.update(); p.draw(); });

      // Enhanced mouse gradient effect
      const mouseGradientRadius = mouse.isOver ? mouse.radius * 1.5 : mouse.radius;
      const mouseGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseGradientRadius);
      
      if (mouse.isOver) {
        mouseGradient.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
        mouseGradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.08)');
        mouseGradient.addColorStop(0.6, 'rgba(255, 140, 0, 0.04)');
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        mouseGradient.addColorStop(0, 'rgba(255, 215, 0, 0.08)');
        mouseGradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.04)');
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(mouse.x - mouseGradientRadius, mouse.y - mouseGradientRadius, mouseGradientRadius * 2, mouseGradientRadius * 2);

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    document.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#000000' }}
    />
  );
}
