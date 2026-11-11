import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import HackerRoom from "../components/HackerRoom.jsx";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import { useMediaQuery } from "react-responsive";
import { calculateSizes, identity } from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Ring from "../components/Ring.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section id="home" className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-4">
        <h1 className="sm:text-3xl text-2xl font-medium text-white text-center font-generalSans">
          Hi, I'm {identity.name} <span className="waving-hand">👋</span>
        </h1>
        <p className="hero_tag text-gray_gradient">Building your Big Ideas into Code</p>
        <p className="text-center text-white-600 text-base sm:text-lg max-w-2xl mx-auto">
          Backend and data engineering — real-time pipelines, on-chain market data and
          AI-agent tooling — with the frontend craft to ship it end to end.
        </p>
      </div>

      {/* THREE.js initializing...! */}
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full" aria-hidden="true">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                scale={sizes.deskScale}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
            </group>
            <Cube position={sizes.cubePosition} />
            <Ring position={sizes.ringPosition} />

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          name="Let's BUILD together !"
          isBeam
          href="#contact"
          containerClass="sm:w-fit w-full sm:min-w-96"
        />
        <Button
          name="See my work"
          href="#work"
          containerClass="sm:w-fit w-full sm:min-w-64"
        />
      </div>
    </section>
  );
};

export default Hero;