import { identity } from "../constants/index.js";

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-center items-center">
      <p className="text-white-600 text-center">
        &copy; 2026 {identity.name}. Built and designed by me.
      </p>
    </footer>
  );
};

export default Footer;
