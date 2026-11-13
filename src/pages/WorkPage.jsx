import { getWorkProject, workProjects } from "../constants/index.js";
import { Link } from "../lib/router.jsx";
import TerminalCard from "../components/TerminalCard.jsx";

const Arrow = () => (
  <img
    src="/assets/arrow-up.png"
    alt=""
    aria-hidden="true"
    className="ml-1 h-3 w-3 object-contain"
  />
);

const Art = ({ art }) => {
  if (art?.kind === "terminal") {
    return (
      <TerminalCard label={art.label} status={art.status} repo={art.repo} lines={art.lines} />
    );
  }
  if (art?.kind === "image") {
    return (
      <figure className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black-200">
        <img
          src={art.src}
          alt={art.alt}
          className="max-h-full max-w-full object-contain"
          loading="eager"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 text-[10px] uppercase tracking-[0.2em] text-white-600/80">
          {art.label}
        </figcaption>
      </figure>
    );
  }
  return null;
};

const WorkPage = ({ slug }) => {
  const project = getWorkProject(slug);

  if (!project) {
    return (
      <section className="c-space my-20 pt-32">
        <h1 className="head-text">That project has no page</h1>
        <p className="text-lead text-white-600 mt-4">
          Every repository is still public, and the selected work is one link away.
        </p>
        <Link
          to="/#work"
          className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center mt-6"
        >
          Selected work
          <Arrow />
        </Link>
      </section>
    );
  }

  const shortTitle = project.title.split(" — ")[0];
  const others = workProjects.filter((item) => item.slug !== project.slug);

  return (
    <article className="c-space my-20 pt-32" id="project">
      <Link to="/#work" className="text-body text-white-600 hover:text-white transition-colors">
        ← Selected work
      </Link>

      <p className="text-meta uppercase tracking-[0.2em] text-white-600/70 mt-10">
        Project
      </p>
      <h1 className="head-text mt-3">{shortTitle}</h1>
      <p className="text-lead text-white-600 mt-5 max-w-3xl">{project.desc}</p>

      <div className="mt-12 h-96 md:h-[34rem] overflow-hidden rounded-lg border border-black-300 bg-black-200">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${shortTitle} repository on GitHub`}
          className="block h-full w-full"
        >
          <Art art={project.art} />
        </a>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-12 mt-12">
        <div>
          <h2 className="text-subtitle font-semibold text-white">What it does</h2>
          <p className="text-body text-white-600 mt-4 leading-relaxed">{project.subdesc}</p>

          <h2 className="text-subtitle font-semibold text-white mt-10">How it is built</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((line) => (
              <li key={line} className="text-body text-white-600 flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#3fb950]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-8">
          <div>
            <h2 className="text-meta uppercase tracking-[0.2em] text-white-600/70">Links</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center"
                >
                  Repository on GitHub
                  <Arrow />
                </a>
              </li>
              {project.demo ? (
                <li>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center"
                  >
                    Live demo
                    <Arrow />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h2 className="text-meta uppercase tracking-[0.2em] text-white-600/70">Stack</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-meta text-white-600 border border-black-300 rounded-full px-3 py-1"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-meta uppercase tracking-[0.2em] text-white-600/70">More work</h2>
            <ul className="mt-4 space-y-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/work/${item.slug}`}
                    className="text-body text-white-600 hover:text-white transition-colors"
                  >
                    {item.title.split(" — ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default WorkPage;