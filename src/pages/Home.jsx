import { lazy, Suspense } from "react";
import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Projects from "../sections/Projects.jsx";
import Experience from "../sections/Experience.jsx";
import Contact from "../sections/Contact.jsx";
import Reveal from "../components/Reveal.jsx";
import PostsTeaser from "../components/PostsTeaser.jsx";

const TrackRecord = lazy(() => import("../sections/TrackRecord.jsx"));

const Home = () => (
  <>
    <Hero />
    <Reveal>
      <About />
    </Reveal>
    <Reveal>
      <Projects />
    </Reveal>
    <Reveal>
      <Experience />
    </Reveal>
    <Suspense fallback={<div className="h-40" />}>
      <TrackRecord />
    </Suspense>
    <Reveal>
      <PostsTeaser />
    </Reveal>
    <Reveal>
      <Contact />
    </Reveal>
  </>
);

export default Home;
