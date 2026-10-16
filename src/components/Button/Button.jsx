import "./Button.css";

function Button({text,variant = "primary",isDisabled = false,onClick,}) {
  return (
    <button
      className={`button button--${variant} ${
        isDisabled ? "button--disabled" : ""
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;