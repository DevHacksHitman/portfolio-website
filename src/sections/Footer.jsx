import { identity } from "../constants/index.js";

const Footer = () => {
  const links = [
    { label: "GitHub", href: identity.github },
    { label: "Telegram", href: identity.telegram },
    { label: "LinkedIn", href: identity.linkedin },
  ];

  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-4 text-white-600">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="text-white-600">
        &copy; 2026 {identity.name}. Built and designed by me.
      </p>
    </footer>
  );
};

export default Footer;