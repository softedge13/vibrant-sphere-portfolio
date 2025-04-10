
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingObject = ({ position, color, size, speed, rotationFactor }: { 
  position: [number, number, number], 
  color: string, 
  size: number,
  speed: number,
  rotationFactor: number
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * rotationFactor;
      mesh.current.rotation.y += delta * rotationFactor * 0.8;
      
      // Add slight bobbing motion
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.003;
    }
  });
  
  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hover ? size * 1.2 : size}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const FloatingTitle = () => {
  const textRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
      textRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <Float floatIntensity={0.5} speed={2}>
      <group ref={textRef} position={[0, 0, 0]}>
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={isMobile ? 0.6 : 1}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            PORTFOLIO
            <meshStandardMaterial 
              color="#bf9dff" 
              roughness={0.1} 
              metalness={0.8}
              emissive="#5b00ff"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
};

const HeroScene = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <Canvas className="absolute inset-0 -z-10">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#bf9dff" />
      
      <FloatingTitle />
      
      <FloatingObject position={[-5, -2, -5]} color="#4f46e5" size={isMobile ? 0.2 : 0.5} speed={1.5} rotationFactor={0.3} />
      <FloatingObject position={[5, 3, -7]} color="#8b5cf6" size={isMobile ? 0.3 : 0.7} speed={1.2} rotationFactor={0.2} />
      <FloatingObject position={[7, -4, -8]} color="#c084fc" size={isMobile ? 0.15 : 0.4} speed={1.7} rotationFactor={0.5} />
      <FloatingObject position={[-7, 4, -10]} color="#818cf8" size={isMobile ? 0.25 : 0.6} speed={1.3} rotationFactor={0.4} />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
};

export default HeroScene;
