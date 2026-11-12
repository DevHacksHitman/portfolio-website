import { workExperiences } from "../constants/index.js";

const Experience = () => {
  return (
    <section id="work" className="c-space my-20">
      <div className="w-full text-white-600">
        <h2 className="head-text">Experience &amp; Education</h2>

        <div className="work-container">
          <div className="work-content col-span-1 lg:col-span-3">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map(({ id, name, pos, duration, title }) => (
                <div key={id} className="work-content_container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo flex items-center justify-center">
                      <span
                        className="text-white-800 font-black text-xl"
                        aria-hidden="true"
                      >
                        {name.trim().charAt(0)}
                      </span>
                    </div>
                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{name}</p>
                    <div className="flex items-center gap-3 text-sm mb-5">
                      <span className="text-white-600">{pos}</span>
                      <span aria-hidden="true" className="h-px w-6 bg-black-500" />
                      <span className="text-white-600/70 tabular-nums">{duration}</span>
                    </div>
                    <p className="group-hover:text-white transition ease-in-out duration-500">
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;