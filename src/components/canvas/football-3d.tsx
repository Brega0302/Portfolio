"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// Pre-calculate patch positions
const patchPositions: [number, number, number][] = [
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0.7, 0.7, 0],
  [-0.7, 0.7, 0],
  [0.7, -0.7, 0],
  [-0.7, -0.7, 0],
  [0, 0.7, 0.7],
  [0, -0.7, 0.7],
].map(pos => {
  const vec = new THREE.Vector3(pos[0], pos[1], pos[2]).normalize().multiplyScalar(0.98);
  return [vec.x, vec.y, vec.z] as [number, number, number];
});

function Football({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const floatOffset = useRef(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      // Float effect
      floatOffset.current = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.position.y = floatOffset.current;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main ball sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Pentagon patches - simplified representation */}
      {patchPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <circleGeometry args={[0.25, 5]} />
          <meshStandardMaterial color="#1a1a1a" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <Football scale={1.5} />
    </>
  );
}

export function Football3D({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
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
