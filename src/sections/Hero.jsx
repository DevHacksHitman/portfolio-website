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
    <section
      id="home"
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
    >
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

      {/* Scrim: protects the headline block without touching the 3D scene.
          Below 1280 the text spans the full width, so the scrim is a band that
          fades out above the desk; at desktop the text is centred and the ring
          and atom sit outside it, so a narrow ellipse keeps those accents at
          full colour. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[48%] md:h-[36%] xl:h-[38%] z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(1,1,3,0.95)_0%,rgba(1,1,3,0.93)_92%,rgba(1,1,3,0)_100%)] md:bg-[linear-gradient(to_bottom,rgba(1,1,3,0.95)_0%,rgba(1,1,3,0.93)_92%,rgba(1,1,3,0)_100%)] xl:bg-[radial-gradient(32%_60%_at_50%_30%,rgba(1,1,3,0.96)_0%,rgba(1,1,3,0.92)_55%,rgba(1,1,3,0)_78%)]"
      />

      <div className="relative z-20 w-full mx-auto flex flex-col sm:mt-32 mt-24 c-space gap-4">
        <h1
          className="sm:text-3xl text-2xl font-medium text-white text-center font-generalSans"
          style={{ textShadow: "0 2px 28px rgba(0,0,0,0.92)" }}
        >
          Hi, I&apos;m {identity.name} <span className="waving-hand">👋</span>
        </h1>
        <p
          className="hero_tag text-gray_gradient"
          style={{ filter: "drop-shadow(0 3px 26px rgba(0,0,0,0.95))" }}
        >
          Building your Big Ideas into Code
        </p>
        <p
          className="text-center text-white-700 text-lead max-w-2xl mx-auto"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95)" }}
        >
          Backend and data engineering — real-time pipelines, on-chain market
          data and Agentic tooling, with the frontend craft to ship it end to
          end.
        </p>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-20 c-space flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          name="Let's BUILD together!"
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
