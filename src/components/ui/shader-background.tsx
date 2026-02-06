"use client";

import { useEffect, useRef } from "react";

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const positionAttributeLocationRef = useRef<number>(0);
  const resolutionUniformLocationRef = useRef<WebGLUniformLocation | null>(null);
  const timeUniformLocationRef = useRef<WebGLUniformLocation | null>(null);
  const mouseUniformLocationRef = useRef<WebGLUniformLocation | null>(null);
  const positionBufferRef = useRef<WebGLBuffer | null>(null);
  const animationFrameIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const mouseXRef = useRef<number>(0);
  const mouseYRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    glRef.current = gl;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - animated gold particles and waves
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Noise functions
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse / u_resolution.xy;
        
        // Create flowing noise pattern
        float time = u_time * 0.15;
        vec2 q = vec2(0.0);
        q.x = fbm(st + time * 0.1);
        q.y = fbm(st + vec2(1.0));
        
        vec2 r = vec2(0.0);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);
        
        float f = fbm(st + r);
        
        // Mouse interaction - subtle ripple
        float mouseDist = distance(st, mouse);
        float mouseInfluence = smoothstep(0.3, 0.0, mouseDist) * 0.15;
        f += mouseInfluence * sin(u_time * 2.0 + mouseDist * 20.0);
        
        // Gold color palette
        vec3 color1 = vec3(0.0, 0.0, 0.0);           // Black
        vec3 color2 = vec3(0.12, 0.10, 0.05);        // Dark brown
        vec3 color3 = vec3(0.83, 0.68, 0.21);        // Gold
        vec3 color4 = vec3(0.65, 0.50, 0.15);        // Dark gold
        
        vec3 color = mix(color1, color2, clamp(f * 1.5, 0.0, 1.0));
        color = mix(color, color4, clamp(length(q) * 0.4, 0.0, 1.0));
        color = mix(color, color3, clamp(length(r.x) * 0.15, 0.0, 1.0));
        
        // Add subtle particles
        float particles = 0.0;
        for (float i = 0.0; i < 3.0; i++) {
          vec2 particlePos = vec2(
            noise(vec2(i * 10.0, time * 0.5)) * 2.0 - 0.5,
            noise(vec2(i * 20.0 + 100.0, time * 0.3)) * 2.0 - 0.5
          );
          float dist = distance(st, particlePos);
          particles += smoothstep(0.02, 0.0, dist) * 0.3;
        }
        color += vec3(particles * 0.8, particles * 0.65, particles * 0.2);
        
        // Vignette
        float vignette = 1.0 - smoothstep(0.3, 1.0, length(st - 0.5) * 1.2);
        color *= vignette * 0.7 + 0.3;
        
        gl_FragColor = vec4(color * 0.4, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const timeUniformLocation = gl.getUniformLocation(program, "u_time");
    const mouseUniformLocation = gl.getUniformLocation(program, "u_mouse");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    programRef.current = program;
    positionAttributeLocationRef.current = positionAttributeLocation;
    resolutionUniformLocationRef.current = resolutionUniformLocation;
    timeUniformLocationRef.current = timeUniformLocation;
    mouseUniformLocationRef.current = mouseUniformLocation;
    positionBufferRef.current = positionBuffer;

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number;
    let startTime = Date.now();

    function handleMouseMove(e: MouseEvent) {
      mouseXRef.current = e.clientX;
      mouseYRef.current = window.innerHeight - e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    function render() {
      const gl = glRef.current;
      const program = programRef.current;
      const positionAttributeLocation = positionAttributeLocationRef.current;
      const resolutionUniformLocation = resolutionUniformLocationRef.current;
      const timeUniformLocation = timeUniformLocationRef.current;
      const mouseUniformLocation = mouseUniformLocationRef.current;
      const positionBuffer = positionBufferRef.current;
      const canvas = canvasRef.current;

      if (!gl || !program || !resolutionUniformLocation || !timeUniformLocation || !mouseUniformLocation || !positionBuffer || !canvas) return;
      
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, (Date.now() - startTimeRef.current) * 0.001);
      gl.uniform2f(mouseUniformLocation, mouseXRef.current, mouseYRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameIdRef.current = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ background: "#0a0a0a" }}
    />
  );
}
