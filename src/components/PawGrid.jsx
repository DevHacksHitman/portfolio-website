import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DIM = new THREE.Color("#101511");
const LIT = new THREE.Color("#3fb950");

/**
 * Strip of paw pads behind the hound. A pad lights up when the dog passes it:
 * color pops bright and settles to steady commit-green.
 */
const PawGrid = ({ progressRef, count, width }) => {
  const mesh = useRef();
  const revealAt = useRef(new Array(count).fill(-1));
  const dummy = useMemoObject3D();
  const color = useRef(new THREE.Color());

  const pads = useMemoPads(count, width);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(pads[i].x, 0.012, pads[i].z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(0.25);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(i, DIM);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [count, width, pads, dummy]);

  useFrame(({ clock }) => {
    const im = mesh.current;
    if (!im) return;
    const p = progressRef.current ?? 0;
    const dogX = THREE.MathUtils.lerp(-width / 2 + 0.8, width / 2 - 0.8, p);
    const now = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const passed = pads[i].x <= dogX + 0.04;
      if (passed && revealAt.current[i] === -1) revealAt.current[i] = now;
      const since = revealAt.current[i];
      let scale = 0.25;
      if (since >= 0) {
        const pop = Math.max(0, 1 - (now - since) * 1.4);
        scale = 1 + pop * 0.6;
        color.current.copy(LIT).multiplyScalar(0.55 + pop * 0.9);
      }
      im.setColorAt(i, color.current);
      dummy.position.set(pads[i].x, 0.012, pads[i].z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    }
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.14, 0.14]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

const useMemoObject3D = () =>
  useRef(new THREE.Object3D()).current;

const useMemoPads = (count, width) =>
  useRef(
    (() => {
      const list = [];
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1);
        list.push({
          x: THREE.MathUtils.lerp(-width / 2 + 0.8, width / 2 - 0.8, t) - 0.12,
          z: i % 2 === 0 ? 0.17 : -0.17,
        });
      }
      return list;
    })()
  ).current;

export default PawGrid;
