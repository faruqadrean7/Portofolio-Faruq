"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text, Edges, Line } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import type { Mesh, Group, Points } from "three";
import * as THREE from "three";

/* Wireframe rotating cube — server rack vibe */
function CodeCube({
  position,
  size = 1,
  speed = 1,
  color = "#1E3A8A",
}: {
  position: [number, number, number];
  size?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
        <Edges color="#0F1115" threshold={15} />
      </mesh>
    </Float>
  );
}

/* Floating terminal/code panel */
function CodePanel({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={ref} position={position} rotation={rotation}>
        <mesh>
          <planeGeometry args={[2.4, 1.5]} />
          <meshStandardMaterial
            color="#0F1115"
            metalness={0.3}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Title bar dots */}
        <mesh position={[-1.05, 0.62, 0.01]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#ff5f57" />
        </mesh>
        <mesh position={[-0.9, 0.62, 0.01]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#febc2e" />
        </mesh>
        <mesh position={[-0.75, 0.62, 0.01]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#28c840" />
        </mesh>
        {/* Code lines */}
        <Text position={[-1.05, 0.32, 0.01]} fontSize={0.11} color="#7dd3fc" anchorX="left">
          {"const dev = () => {"}
        </Text>
        <Text position={[-0.95, 0.12, 0.01]} fontSize={0.11} color="#a78bfa" anchorX="left">
          {"build('web')"}
        </Text>
        <Text position={[-0.95, -0.08, 0.01]} fontSize={0.11} color="#a78bfa" anchorX="left">
          {"ship('fast')"}
        </Text>
        <Text position={[-0.95, -0.28, 0.01]} fontSize={0.11} color="#86efac" anchorX="left">
          {"return ✓"}
        </Text>
        <Text position={[-1.05, -0.48, 0.01]} fontSize={0.11} color="#7dd3fc" anchorX="left">
          {"}"}
        </Text>
      </group>
    </Float>
  );
}

/* Wireframe sphere — network/globe */
function NetworkSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.8, 16, 12]} />
        <meshBasicMaterial color="#1E3A8A" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

/* Particle field — data points */
function DataParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#1E3A8A"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* Connection lines — circuit traces */
function CircuitLines() {
  const points: [number, number, number][][] = useMemo(
    () => [
      [
        [-3, -1.5, -1],
        [-1.5, -1.5, -1],
        [-1.5, 0.5, -1],
        [0.5, 0.5, -1],
      ],
      [
        [3, 1.5, -1],
        [1.5, 1.5, -1],
        [1.5, -0.3, -1],
        [-0.3, -0.3, -1],
      ],
      [
        [-3.5, 1, -1.5],
        [-2, 1, -1.5],
        [-2, -1, -1.5],
      ],
    ],
    []
  );
  return (
    <>
      {points.map((p, i) => (
        <Line
          key={i}
          points={p}
          color="#1E3A8A"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x * 0.25;
    const y = state.pointer.y * 0.15;
    group.current.rotation.y += (x - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 2, -3]} intensity={0.6} color="#1E3A8A" />
      <pointLight position={[3, -3, 2]} intensity={0.4} color="#7dd3fc" />

      <CodePanel position={[2.4, 0.6, 0]} rotation={[0, -0.25, 0]} />
      <CodeCube position={[-2.6, 0.8, -0.5]} size={0.9} />
      <CodeCube position={[-1.8, -1.2, 0.5]} size={0.5} speed={1.5} color="#0F1115" />
      <CodeCube position={[2.8, -1.4, -1]} size={0.6} speed={0.7} color="#7dd3fc" />
      <NetworkSphere position={[-3.2, -0.2, -1.5]} />

      <CircuitLines />
      <DataParticles count={180} />

      <Environment preset="city" />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
