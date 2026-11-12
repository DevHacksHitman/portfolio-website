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
    <section id="home" className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Scene sits behind everything and never intercepts the pointer. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas className="w-full h-full" aria-hidden="true">
          {/* The loader lives outside the R3F tree — see CanvasLoader.jsx. */}
          <Suspense fallback={null}>
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
        <CanvasLoader />
      </div>

      {/* Scrim: darkens only the area behind the headline block. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[72%] z-10 pointer-events-none bg-[radial-gradient(120%_85%_at_50%_24%,rgba(1,1,3,0.96)_0%,rgba(1,1,3,0.9)_55%,rgba(1,1,3,0.62)_100%)]"
      />

      <div className="relative z-20 w-full mx-auto flex flex-col sm:mt-32 mt-24 c-space gap-4">
        <h1
          className="sm:text-3xl text-2xl font-medium text-white text-center font-generalSans"
          style={{ textShadow: "0 2px 28px rgba(0,0,0,0.92)" }}
        >
          Hi, I'm {identity.name} <span className="waving-hand">👋</span>
        </h1>
        <p
          className="hero_tag text-gray_gradient"
          style={{ filter: "drop-shadow(0 3px 26px rgba(0,0,0,0.95))" }}
        >
          Building your Big Ideas into Code
        </p>
        <p
          className="text-center text-white-700 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95)" }}
        >
          Backend and data engineering — real-time pipelines, on-chain market data and
          AI-agent tooling — with the frontend craft to ship it end to end.
        </p>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-20 c-space flex flex-col sm:flex-row items-center justify-center gap-4">
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