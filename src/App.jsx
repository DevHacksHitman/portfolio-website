import { lazy, Suspense } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";

const TrackRecord = lazy(() => import("./sections/TrackRecord.jsx"));

const App = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-black-300 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="max-w-7xl mx-auto">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Suspense fallback={<div className="h-40" />}>
          <TrackRecord />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
};
export default App;