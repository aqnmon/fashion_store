import "./Toast.css";

function Toast({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="toast">
      <span className="toast__icon">✓</span>
      <span className="toast__message">{message}</span>
    </div>
  );
}

export default Toast;