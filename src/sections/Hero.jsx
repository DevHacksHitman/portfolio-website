import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import HackerRoom from "../components/HackerRoom.jsx";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Ring from "../components/Ring.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {
  {
    /* const controls = useControls(
            'HackerRoom', {
                positionX: {
                    value: 25,
                    min: -10,
                    max: 10
                },
                positionY: {
                    value: 25,
                    min: -10,
                    max: 10
                },
                positionZ: {
                    value: 25,
                    min: -10,
                    max: 10
                },
                rotationX: {
                    value: 0.1,
                    min: -10,
                    max: 10
                },
                rotationY: {
                    value: 0.1,
                    min: -10,
                    max: 10
                },
                rotationZ: {
                    value: 0.1,
                    min: -10,
                    max: 10
                },
                scale: {
                    value: 1,
                    min: -10,
                    max: 10
                },
            }) */
  }

  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // noinspection JSXUnresolvedComponent,HtmlUnknownAnchorTarget
  return (
    <section id="home" className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalSans">
          Hi, I am Kik <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building your Big Ideas into Code
        </p>
      </div>

      {/* THREE.js initializing...! */}
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
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

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button
            name="Let's BUILD together !"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
