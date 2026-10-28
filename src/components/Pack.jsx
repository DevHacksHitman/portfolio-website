import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Stylized hound, hand-modeled from primitives. Paths the strip left -> right
 * driven by section scroll progress; limbs trot on their own clock.
 */
const Pack = ({ progressRef, width, reduced }) => {
  const group = useRef();
  const legFL = useRef();
  const legFR = useRef();
  const legBL = useRef();
  const legBR = useRef();
  const tail = useRef();
  const body = useRef();

  const ease = (p) => p * p * (3 - 2 * p);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const p = progressRef.current ?? 0;
    const eased = reduced ? 0.5 : ease(p);
    group.current.position.x = THREE.MathUtils.lerp(
      -width / 2 + 0.8,
      width / 2 - 0.8,
      eased
    );

    if (reduced) {
      [legFL, legFR, legBL, legBR].forEach((l) => {
        if (l.current) l.current.rotation.z = 0;
      });
      if (tail.current) tail.current.rotation.x = 0;
      if (body.current) body.current.position.y = 0;
      return;
    }

    const t = clock.getElapsedTime();
    const swing = 0.55;
    const s = Math.sin(t * 8);
    const c = Math.sin(t * 8 + Math.PI);
    if (legFL.current) legFL.current.rotation.z = s * swing;
    if (legFR.current) legFR.current.rotation.z = s * swing;
    if (legBL.current) legBL.current.rotation.z = c * swing;
    if (legBR.current) legBR.current.rotation.z = c * swing;
    if (tail.current) tail.current.rotation.x = Math.sin(t * 3.1) * 0.35;
    if (body.current) body.current.position.y = Math.abs(Math.sin(t * 8)) * 0.05;
  });

  const slate = "#26262E";
  const darker = "#1C1C21";

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* body */}
      <mesh ref={body} position={[0, 0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.21, 0.5, 4, 10]} />
        <meshStandardMaterial color={slate} flatShading />
      </mesh>

      {/* chest + neck */}
      <mesh position={[0.34, 0.56, 0]} rotation={[0, 0, Math.PI / 3]}>
        <capsuleGeometry args={[0.13, 0.22, 4, 8]} />
        <meshStandardMaterial color={slate} flatShading />
      </mesh>

      {/* head */}
      <group position={[0.52, 0.74, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={slate} flatShading />
        </mesh>
        {/* snout */}
        <mesh position={[0.13, -0.03, 0]}>
          <boxGeometry args={[0.17, 0.09, 0.11]} />
          <meshStandardMaterial color={darker} flatShading />
        </mesh>
        {/* ears */}
        <mesh position={[-0.03, 0.14, 0.08]} rotation={[0, 0, -0.35]}>
          <coneGeometry args={[0.05, 0.14, 8]} />
          <meshStandardMaterial color={darker} flatShading />
        </mesh>
        <mesh position={[-0.03, 0.14, -0.08]} rotation={[0, 0, -0.35]}>
          <coneGeometry args={[0.05, 0.14, 8]} />
          <meshStandardMaterial color={darker} flatShading />
        </mesh>
        {/* eyes */}
        <mesh position={[0.11, 0.04, 0.06]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#E4E4E6" />
        </mesh>
        <mesh position={[0.11, 0.04, -0.06]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#E4E4E6" />
        </mesh>
        {/* collar */}
        <mesh position={[-0.09, -0.06, 0]} rotation={[0, Math.PI / 2, 0.2]}>
          <torusGeometry args={[0.13, 0.028, 8, 20]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* legs — pivot groups so swing rotates around the hip */}
      {[
        { ref: legFL, x: 0.28, z: 0.12 },
        { ref: legFR, x: 0.28, z: -0.12 },
        { ref: legBL, x: -0.28, z: 0.12 },
        { ref: legBR, x: -0.28, z: -0.12 },
      ].map(({ ref, x, z }) => (
        <group key={z + "" + x} ref={ref} position={[x, 0.36, z]}>
          <mesh position={[0, -0.17, 0]}>
            <cylinderGeometry args={[0.042, 0.034, 0.36, 8]} />
            <meshStandardMaterial color={darker} flatShading />
          </mesh>
        </group>
      ))}

      {/* tail */}
      <group ref={tail} position={[-0.52, 0.62, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2.6]}>
          <coneGeometry args={[0.055, 0.42, 8]} />
          <meshStandardMaterial color={darker} flatShading />
        </mesh>
      </group>
    </group>
  );
};

export default Pack;
