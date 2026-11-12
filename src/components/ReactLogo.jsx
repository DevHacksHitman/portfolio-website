import { Float, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

const ReactLogo = (props) => {
    const { nodes, materials } = useGLTF('/models/react.glb')

    // Dimmed a little so the atom reads as background, never competing with the
    // hero text (WCAG AA). The scrim covers it where it does cross the text.
    const dimmed = useMemo(() => {
        const material = materials['Material.002'].clone();
        material.color.multiplyScalar(0.8);
        if (material.emissive) material.emissiveIntensity = 0.35;
        return material;
    }, [materials]);

    return (
        <Float floatIntensity={1}>
            <group position={[8, 8, 0]} scale={0.4} {...props} dispose={null}>
                <mesh
                    geometry={nodes['React-Logo_Material002_0'].geometry}
                    material={dimmed}
                    position={[0, 0.07935, 0.18102]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.39, 0.39, 0.5]}
                />
            </group>
        </Float>
    )
}

useGLTF.preload('/models/react.glb')

export default ReactLogo
