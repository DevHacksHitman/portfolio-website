import { myProjects } from "../constants/index.js";
import { useState } from "react";

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
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 border border-black-300 rounded-lg">
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <h3 className="text-white text-2xl font-semibold">
              {currentProject.title}
            </h3>
            <p>{currentProject.desc}</p>
            <p>{currentProject.subdesc}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentProject.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs text-white-600 border border-black-300 rounded-full px-3 py-1"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <a
            className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-white transition-colors w-fit min-h-11"
            href={currentProject.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View on GitHub</span>
            <img src="/assets/arrow-up.png" alt="" className="w-3 h-3" />
          </a>

          <div className="flex justify-between items-center mt-7">
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

        <div
          className="relative border border-black-300 bg-black-200 rounded-lg h-96 md:h-full flex flex-col items-center justify-center gap-6 p-8 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(63,185,80,0.16),transparent_70%)]" />
          <span className="relative text-7xl font-black tracking-tight text-white-800/15">
            {String(selectedProjectIndex + 1).padStart(2, "0")}
          </span>
          <p className="relative text-white-600 text-xs uppercase tracking-[0.3em] text-center">
            {currentProject.title.split(" — ")[0]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;