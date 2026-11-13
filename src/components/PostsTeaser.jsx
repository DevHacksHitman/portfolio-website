import { formatDate, posts } from "../lib/posts.js";
import { Link } from "../lib/router.jsx";

/** Home-page teaser: the three most recent posts, plus a link to the archive. */
const PostsTeaser = () => {
  const latest = posts.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section className="c-space my-20" id="notes">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="head-text">Notes</h2>
        <Link
          to="/posts"
          className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center"
        >
          All posts
          <img
            src="/assets/arrow-up.png"
            alt=""
            aria-hidden="true"
            className="ml-1 h-3 w-3 object-contain"
          />
        </Link>
      </div>

      <p className="text-lead text-white-600 mt-4 max-w-3xl">
        Short pieces about decisions inside these repositories — and the parts that do not
        work yet.
      </p>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-10">
        {latest.map((post) => (
          <Link
            key={post.slug}
            to={`/posts/${post.slug}`}
            className="grid-container rounded-lg border border-black-300 bg-black-200 p-6 transition-colors hover:border-black-500"
          >
            <p className="text-meta uppercase tracking-[0.2em] text-white-600/70">
              {formatDate(post.date)} · {post.minutes} min
            </p>
            <h3 className="grid-headtext mt-2">{post.title}</h3>
            <p className="grid-subtext">{post.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostsTeaser;
