import { useEffect } from "react";
import Navbar from "./sections/Navbar.jsx";
import Footer from "./sections/Footer.jsx";
import Home from "./pages/Home.jsx";
import PostsIndex from "./pages/PostsIndex.jsx";
import PostPage from "./pages/PostPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import { useLocation } from "./lib/router.jsx";
import { getPost } from "./lib/posts.js";
import { getWorkProject } from "./constants/index.js";

const SITE_NAME = "AbdulAzeez Animashaun";

// Tolerate "/posts/slug", "/posts/slug/" and "/posts/slug/index.html" — a
// static host may serve the generated file at any of those shapes.
const readSlug = (pathname, base) =>
  pathname
    .replace(new RegExp(`^${base}/?`), "")
    .replace(/\/index\.html$/, "")
    .replace(/\/+$/, "");

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
      "Backend engineering, real-time data pipelines and agentic tooling, built in public.";

    if (pathname === "/posts") {
      title = `Posts — ${SITE_NAME}`;
      description = "Short pieces about decisions inside my public repositories.";
    } else if (pathname.startsWith("/posts/")) {
      const post = getPost(readSlug(pathname, "/posts"));
      if (post) {
        title = `${post.title} — ${SITE_NAME}`;
        description = post.summary || description;
      }
    } else if (pathname.startsWith("/work/")) {
      const project = getWorkProject(readSlug(pathname, "/work"));
      if (project) {
        title = `${project.title.split(" — ")[0]} — ${SITE_NAME}`;
        description = project.desc;
      }
    }

    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [pathname]);

  // Tolerate the same path shapes for work pages as for posts.
  const postSlug = readSlug(pathname, "/posts");
  const workSlug = readSlug(pathname, "/work");
  const isArchive = pathname === "/posts" || pathname === "/posts/";
  const isSinglePost = !isArchive && pathname.startsWith("/posts/");
  const isWork = pathname.startsWith("/work/");

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
          <PostPage slug={postSlug} />
        ) : isWork ? (
          <WorkPage slug={workSlug} />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
