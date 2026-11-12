import { lazy, Suspense, useState } from "react";
import Button from "../components/Button.jsx";
import LazyMount from "../components/LazyMount.jsx";
import { identity } from "../constants/index.js";

const Globe = lazy(() => import("react-globe.gl"));

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      setHasCopied(false);
    }
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <div className="h-1 w-16 rounded-full bg-[#3fb950]" aria-hidden="true" />
            <div>
              <h2 className="grid-headtext">Hi, I&apos;m {identity.name}</h2>
              <p className="grid-subtext">
                I&apos;m a software engineer based in Ibadan, Nigeria. I hold a B.Sc.Ed
                (Biology) from the University of Ilorin and I now build backend
                systems, real-time data pipelines and agentic tooling. I work in
                Python and Rust, I&apos;ve shipped Web3 work in Solidity and Tact, and
                I&apos;m currently building a Telegram Mini App in Go on the GRAM
                blockchain.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <div className="h-1 w-16 rounded-full bg-[#3fb950]" aria-hidden="true" />
            <div>
              <h2 className="grid-headtext">Tech Stack</h2>
              <p className="grid-subtext">
                Python · Rust · JavaScript/TypeScript · Go · Solidity and Tact · Solana
                and EVM tooling · Agentic tooling. Every line above is backed by a
                repository you can read.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <LazyMount
              className="rounded-3xl w-full h-[326px] flex justify-center items-center"
              aria-hidden="true"
              placeholder={
                <div className="h-[326px] w-full animate-pulse rounded-3xl bg-black-300/40" />
              }
            >
              <Suspense fallback={<div className="h-[326px] w-full" />}>
                <Globe
                  height={326}
                  width={326}
                  backgroundColor="rgba(0,0,0,0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  showGraticules
                  globeImageUrl="/textures/earth-night.jpg"
                  bumpImageUrl="/textures/earth-topology.png"
                  labelsData={[
                    {
                      lat: 7.3775,
                      lng: 3.947,
                      text: "Ibadan, Nigeria",
                      color: "white",
                      size: 30,
                    },
                  ]}
                />
              </Suspense>
            </LazyMount>
            <div>
              <h2 className="grid-headtext">
                Open to remote work and relocation.
              </h2>
              <p className="grid-subtext">
                I&apos;m in Ibadan, Nigeria — WAT (UTC+1), which overlaps comfortably
                with European mornings and US-East afternoons.
              </p>
              <Button name="Contact me" isBeam href="#contact" containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <div className="h-1 w-16 rounded-full bg-[#3fb950]" aria-hidden="true" />
            <div>
              <h2 className="grid-headtext">I came to software from teaching.</h2>
              <p className="grid-subtext">
                I came to software from teaching, and I still teach: every repo
                I ship has a README that explains the why, not just the how.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className="space-y-2 w-full">
              <p className="grid-subtext text-center">Contact me</p>
              <button
                type="button"
                onClick={handleCopy}
                className="copy-container w-full min-h-11"
              >
                <img src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"} alt="" />
                <span className="lg:text-xl md:text-lg font-medium text-white break-all">
                  {identity.email}
                </span>
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {hasCopied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;