import { formatDate, posts } from "../lib/posts.js";
import { Link } from "../lib/router.jsx";

const PostsIndex = () => (
  <section className="c-space my-20 pt-32" id="posts">
    <h1 className="head-text">Notes from building in public</h1>
    <p className="text-lead text-white-600 mt-4 max-w-3xl">
      Short pieces about decisions in the repositories on this site — the ones that were
      interesting to make, and the parts that do not work yet. No launch announcements.
    </p>

    <ul className="mt-12 flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={`/posts/${post.slug}`}
            className="block rounded-lg border border-black-300 bg-black-200 p-6 sm:p-7 transition-colors hover:border-black-500"
          >
            <p className="text-meta uppercase tracking-[0.2em] text-white-600/70">
              {formatDate(post.date)} · {post.minutes} min read
            </p>
            <h2 className="text-title text-white-800 mt-2">{post.title}</h2>
            <p className="text-body text-white-600 mt-2">{post.summary}</p>
            <span className="text-body text-white-600 mt-3 inline-flex items-center">
              Read
              <img
                src="/assets/arrow-up.png"
                alt=""
                aria-hidden="true"
                className="ml-1 h-3 w-3 object-contain"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default PostsIndex;
