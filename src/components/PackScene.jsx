import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import Pack from "./Pack.jsx";
import PawGrid from "./PawGrid.jsx";

export const PAD_COUNT = 28;
export const STRIP_WIDTH = 14;

const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
    <planeGeometry args={[40, 14]} />
    <meshStandardMaterial color="#050507" />
  </mesh>
);

const PackScene = ({ progressRef }) => {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true,
    []
  );

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.7, 7.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#010103", 7, 17]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#E4E4E6" />
      <pointLight
        position={[-3, 2.2, 2]}
        intensity={14}
        color="#3fb950"
        distance={6.5}
        decay={2}
      />
      <Ground />
      <PawGrid progressRef={progressRef} count={PAD_COUNT} width={STRIP_WIDTH} />
      <Pack progressRef={progressRef} width={STRIP_WIDTH} reduced={reduced} />
    </Canvas>
  );
};

export default PackScene;
