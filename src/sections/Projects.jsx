import { myProjects } from "../constants/index.js";
import { useState } from "react";
import TerminalCard from "../components/TerminalCard.jsx";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      const step = direction === "previous" ? -1 : 1;
      return (prevIndex + step + projectCount) % projectCount;
    });
  };

  return (
    <section className="c-space my-20" id="projects">
      <h2 className="head-text">Selected work</h2>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col justify-between gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 border border-black-300 rounded-lg transition-colors hover:border-black-500 hover:bg-black-300/20">
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <h3 className="text-white text-subtitle font-semibold">
              {/* Stretched link: the whole card is one click-through to the
                  repository, while the buttons and the explicit link below
                  stay on top of it. */}
              <a
                href={currentProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 transition-colors hover:text-white after:absolute after:inset-0 after:content-[''] after:rounded-lg"
              >
                {currentProject.title}
                <img
                  src="/assets/arrow-up.png"
                  alt=""
                  className="mt-1 w-3 h-3 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            </h3>
            <p>{currentProject.desc}</p>
            <p>{currentProject.subdesc}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentProject.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-meta text-white-600 border border-black-300 rounded-full px-3 py-1"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <a
            className="relative z-10 flex items-center gap-2 cursor-pointer text-white-600 hover:text-white transition-colors w-fit min-h-11"
            href={currentProject.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View on GitHub</span>
            <img src="/assets/arrow-up.png" alt="" className="w-3 h-3" />
          </a>

          <div className="relative z-10 flex justify-between items-center mt-7">
            <button
              className="arrow-btn min-h-11 min-w-11"
              onClick={() => handleNavigation("previous")}
              aria-label="Previous project"
            >
              <img src="/assets/left-arrow.png" alt="" className="w-4 h-4" />
            </button>
            <button
              className="arrow-btn min-h-11 min-w-11"
              onClick={() => handleNavigation("next")}
              aria-label="Next project"
            >
              <img src="/assets/right-arrow.png" alt="" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <a
          href={currentProject.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${currentProject.title} on GitHub`}
          className="group relative border border-black-300 bg-black-200 rounded-lg h-96 md:h-full flex flex-col overflow-hidden transition-colors hover:border-black-500"
        >
          {currentProject.art?.kind === "terminal" ? (
            <TerminalCard
              label={currentProject.art.label}
              status={currentProject.art.status}
              repo={currentProject.art.repo}
              lines={currentProject.art.lines}
            />
          ) : currentProject.art?.kind === "image" ? (
            <figure className="relative h-full w-full overflow-hidden">
              <img
                src={currentProject.art.src}
                alt={currentProject.art.alt}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 text-[10px] uppercase tracking-[0.2em] text-white-600/80">
                {currentProject.art.label}
              </span>
            </figure>
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-6 p-8">
              <span className="text-7xl font-black tracking-tight text-white-800/15">
                {String(selectedProjectIndex + 1).padStart(2, "0")}
              </span>
              <p className="text-white-600 text-xs uppercase tracking-[0.3em] text-center">
                {currentProject.title.split(" — ")[0]}
              </p>
            </div>
          )}
        </a>
      </div>
    </section>
  );
};

export default Projects;
