import "./Logo.css";

function Logo({
  src,
  altText,
  width,
  height,
}) {
  return (
    <img
      src={src}
      alt={altText}
      width={width}
      height={height}
      className="logo"
    />
  );
}

export default Logo;