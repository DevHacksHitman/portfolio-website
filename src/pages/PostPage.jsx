import { formatDate, getPost } from "../lib/posts.js";
import { renderMarkdown } from "../lib/markdown.jsx";
import { Link } from "../lib/router.jsx";

const PostPage = ({ slug }) => {
  const post = getPost(slug);

  if (!post) {
    return (
      <section className="c-space my-20 pt-32">
        <h1 className="head-text">That post does not exist</h1>
        <p className="text-lead text-white-600 mt-4">
          It may have been renamed. The full list is one link away.
        </p>
        <Link
          to="/posts"
          className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center mt-6"
        >
          All posts
          <img
            src="/assets/arrow-up.png"
            alt=""
            aria-hidden="true"
            className="ml-1 h-3 w-3 object-contain"
          />
        </Link>
      </section>
    );
  }

  return (
    <article className="c-space my-20 pt-32" id="post">
      <Link
        to="/posts"
        className="text-body text-white-600 hover:text-white transition-colors"
      >
        ← All posts
      </Link>

      <h1 className="head-text mt-8">{post.title}</h1>
      <p className="text-meta uppercase tracking-[0.2em] text-white-600/70 mt-4">
        {formatDate(post.date)} · {post.minutes} min read
      </p>

      <div className="prose mt-10 max-w-3xl">{renderMarkdown(post.body)}</div>

      {post.repo ? (
        <a
          href={post.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-body text-white-600 hover:text-white transition-colors inline-flex items-center mt-10"
        >
          The repository behind this post
          <img
            src="/assets/arrow-up.png"
            alt=""
            aria-hidden="true"
            className="ml-1 h-3 w-3 object-contain"
          />
        </a>
      ) : null}
    </article>
  );
};

export default PostPage;
