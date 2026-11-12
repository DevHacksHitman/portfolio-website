import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { identity } from "../constants/index.js";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        "service_5vsjiet",
        "template_nlmsci5",
        {
          from_name: form.name,
          to_name: identity.name,
          from_email: form.email,
          to_email: identity.email,
          message: form.message,
        },
        "HOfB__RZK9GYJqCh0"
      );
      setLoading(false);
      setStatus({ type: "success", message: "Your message has been sent." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setStatus({
        type: "error",
        message: "Something went wrong — please try again, or email me directly.",
      });
    }
  };

  return (
    <section id="contact" className="c-space my-20">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div
          className="absolute inset-0 min-h-screen bg-[radial-gradient(60%_50%_at_50%_20%,rgba(63,185,80,0.10),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-start mt-12">
          <div className="contact-container">
            <h2 className="head-text">Get in touch</h2>
            <p className="text-lead text-white-600 mt-3">
            Tell me about the role, the project, or the problem you're working
            on. I'm happy to talk backend, data and AI-agent work — and I'll
            reply honestly about fit.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <div className="space-y-3">
              <label htmlFor="name" className="field-label block">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="field-input"
                placeholder="Albert Einstein"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="email" className="field-label block">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="field-input"
                placeholder="alberteinstein@gmail.com"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="message" className="field-label block">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Tell me about the role or the project..."
              />
            </div>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}

              <img
                src="/assets/arrow-up.png"
                alt=""
                className="field-btn_arrow"
              />
            </button>

            <p
              role="status"
              aria-live="polite"
              className={
                status.type === "error"
                  ? "text-[#f59e0b]"
                  : "text-[#3fb950]"
              }
            >
              {status.message}
            </p>
          </form>
          </div>

          <aside className="contact-details" aria-label="Direct contact details">
            <p className="contact-details_label">Email</p>
            <a
              className="contact-details_value hover:text-white transition-colors"
              href={`mailto:${identity.email}`}
            >
              {identity.email}
            </a>

            <p className="contact-details_label">Location</p>
            <p className="contact-details_value">
              {identity.location} · {identity.timezone}
            </p>

            <p className="contact-details_label">Elsewhere</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a
                className="contact-details_link"
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="contact-details_link"
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="contact-details_link"
                href={identity.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram ↗
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;