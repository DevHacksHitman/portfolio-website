import { lazy, Suspense } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx"
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";

const TrackRecord = lazy(() => import("./sections/TrackRecord.jsx"));

const App = () => {
    return(
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Clients />
            <Experience />
            <Suspense fallback={<div className="h-40" />}>
                <TrackRecord />
            </Suspense>
            <Contact />
            <Footer />
        </main>
    )
}
export default App
