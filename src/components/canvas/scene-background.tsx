"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function FloatingGeometry({ position, color, speed = 1, floatSpeed = 1 }: { position: [number, number, number]; color: string; speed?: number; floatSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      // Custom float animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function FloatingTorus({ position, color, floatSpeed = 1.5 }: { position: [number, number, number]; color: string; floatSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      // Custom float animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed + 1) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.4, 0.15, 8, 16]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#f97316"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.05);
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#ec4899"
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <ParticleField />
      <MouseFollower />
      
      {/* Scattered geometric shapes */}
      <FloatingGeometry position={[-4, 2, -5]} color="#f97316" speed={0.8} />
      <FloatingGeometry position={[4, -1, -4]} color="#ec4899" speed={1.2} />
      <FloatingGeometry position={[-2, -2, -6]} color="#06b6d4" speed={0.6} />
      <FloatingGeometry position={[3, 3, -7]} color="#f97316" speed={1} />
      
      <FloatingTorus position={[-3, -1, -4]} color="#ec4899" />
      <FloatingTorus position={[2, 2, -5]} color="#06b6d4" />
      <FloatingTorus position={[5, -2, -6]} color="#f97316" />
    </>
  );
}

export function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
