import { useCallback, useEffect, useState } from "react";

/**
 * A ~40-line router on the History API.
 *
 * Deliberately dependency-free: the site needs two routes, and pulling a
 * routing library in for that would add a permanent dependency plus a
 * maintenance surface for no benefit. pushState emits a synthetic popstate
 * event so every listener re-renders from one code path.
 */

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

export function navigate(to) {
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, "", to);
  notify();
}

export function useLocation() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }));

  const update = useCallback(() => {
    setLocation({ pathname: window.location.pathname, hash: window.location.hash });
  }, []);

  useEffect(() => {
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, [update]);

  return location;
}

/** Internal link: same API as an <a>, but routed. */
export function Link({ to, children, className, onClick, ...rest }) {
  const handleClick = (event) => {
    onClick?.(event);
    // leave modified clicks (new tab, save, etc.) to the browser
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    if (!to.startsWith("/")) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
