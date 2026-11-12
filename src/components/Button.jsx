const Button = ({ name, isBeam = false, containerClass, href }) => {
  const content = (
    <>
      {isBeam && (
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="btn-ping" />
          <span className="btn-ping_dot" />
        </span>
      )}
      {name}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`btn ${containerClass}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={`btn ${containerClass}`}>
      {content}
    </button>
  );
};

export default Button;