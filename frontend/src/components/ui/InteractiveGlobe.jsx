import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlobeMesh = () => {
  const globeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (globeRef.current) {
      // Auto-rotate
      globeRef.current.rotation.y += 0.002;

      // Gentle floating animation
      globeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create globe geometry
  const globeGeometry = new THREE.SphereGeometry(2, 64, 64);

  // Create custom shader material for orange glow
  const globeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#FF7C08') },
      color2: { value: new THREE.Color('#FF9F40') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        // Create grid pattern
        float grid = step(0.95, fract(vUv.x * 40.0)) + step(0.95, fract(vUv.y * 40.0));

        // Fresnel effect for glow
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

        // Mix colors
        vec3 color = mix(color1, color2, vUv.y);

        // Apply grid and fresnel
        vec3 finalColor = color * (0.3 + grid * 0.7) + color * fresnel * 0.5;

        gl_FragColor = vec4(finalColor, 0.6 + fresnel * 0.4);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  useFrame((state) => {
    if (globeMaterial.uniforms) {
      globeMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh
        geometry={globeGeometry}
        material={globeMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Inner glow */}
        <pointLight intensity={0.5} color="#FF7C08" />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[2.2, 2.5, 64]} />
        <meshBasicMaterial
          color="#FF7C08"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Particles around globe */}
      {Array.from({ length: 50 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 2.3 + Math.random() * 0.5;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#FF7C08" />
          </mesh>
        );
      })}
    </group>
  );
};

const InteractiveGlobe = () => {
  const containerRef = useRef();

  return (
    <div ref={containerRef} className="interactive-globe-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF7C08" />

        <GlobeMesh />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      <style jsx>{`
        .interactive-globe-container {
          position: absolute;
          bottom: -10%;
          right: -5%;
          width: 600px;
          height: 600px;
          pointer-events: auto;

          /* Radial mask to fade into black background */
          mask-image: radial-gradient(
            circle at center,
            black 30%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            circle at center,
            black 30%,
            transparent 70%
          );

          /* Additional fade overlay */
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .interactive-globe-container {
            width: 400px;
            height: 400px;
            bottom: -15%;
            right: -10%;
          }
        }

        @media (max-width: 480px) {
          .interactive-globe-container {
            display: none; /* Hide on very small screens for performance */
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;
