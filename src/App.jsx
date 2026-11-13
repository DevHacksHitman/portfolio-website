import { useEffect } from "react";
import Navbar from "./sections/Navbar.jsx";
import Footer from "./sections/Footer.jsx";
import Home from "./pages/Home.jsx";
import PostsIndex from "./pages/PostsIndex.jsx";
import PostPage from "./pages/PostPage.jsx";
import { Link, useLocation } from "./lib/router.jsx";
import { getPost } from "./lib/posts.js";

const SITE_NAME = "AbdulAzeez Animashaun";

const App = () => {
  const { pathname, hash } = useLocation();

  // Scroll: to the section when there is a hash, otherwise to the top of the page.
  useEffect(() => {
    if (hash) {
      const node = document.getElementById(hash.slice(1));
      if (node) {
        window.requestAnimationFrame(() =>
          node.scrollIntoView({ behavior: "smooth", block: "start" })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  // Per-route title and description, so a shared post link previews correctly.
  useEffect(() => {
    let title = `${SITE_NAME} — Software Engineer`;
    let description =
      "Backend systems, real-time data pipelines and AI-agent tooling, built in public.";

    if (pathname === "/posts") {
      title = `Posts — ${SITE_NAME}`;
      description = "Short pieces about decisions inside my public repositories.";
    } else if (pathname.startsWith("/posts/")) {
      const post = getPost(pathname.slice("/posts/".length));
      if (post) {
        title = `${post.title} — ${SITE_NAME}`;
        description = post.summary || description;
      }
    }

    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [pathname]);

  const isArchive = pathname === "/posts";
  const isSinglePost = pathname.startsWith("/posts/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-black-300 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="max-w-7xl mx-auto">
        {isArchive ? (
          <PostsIndex />
        ) : isSinglePost ? (
          <PostPage slug={pathname.slice("/posts/".length)} />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
