import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Floating target — hand-modeled from primitives (no remote assets, no CDN).
 * Concentric disks in the Hundjäger palette; floats in place via GSAP.
 */
const Target = (props) => {
  const targetRef = useRef();

  useGSAP(() => {
    if (!targetRef.current) return;
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  const disk = (radius, color, z, key) => (
    <mesh key={key} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, 0.05, 32]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );

  return (
    <group {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      {disk(0.5, "#1C1C21", 0, "board")}
      {disk(0.37, "#E4E4E6", 0.032, "ring-1")}
      {disk(0.24, "#3fb950", 0.064, "ring-2")}
      {disk(0.11, "#f59e0b", 0.096, "bullseye")}
    </group>
  );
};

export default Target;
