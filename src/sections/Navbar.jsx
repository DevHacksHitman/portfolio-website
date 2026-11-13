import { useEffect, useState } from "react";
import { navLinks } from "../constants/index.js";
import { Link } from "../lib/router.jsx";

const NavItems = ({ onNavigate }) => {
  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, href, name }) => (
        <li key={id} className="nav-li">
          <Link to={href} className="nav-li_a" onClick={onNavigate}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <Link
            to="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
            onClick={close}
          >
            Dev_Kik
          </Link>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white sm:hidden flex items-center justify-center p-2 min-h-11 min-w-11"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt=""
              className="w-6 h-6"
            />
          </button>

          <nav aria-label="Primary" className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-nav" className="nav-sidebar max-h-screen">
          <nav aria-label="Mobile" className="p-5">
            <NavItems onNavigate={close} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
