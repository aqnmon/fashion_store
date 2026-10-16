import "./Container.css";

function Container({ children, className = "", maxWidth }) {
  return (
    <div
      className={`container ${className}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </div>
  );
}

export default Container;