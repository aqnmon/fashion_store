import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useEscapeKey from "../../hooks/useEscapeKey";
import "./Modal.css";

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);
  useEscapeKey(onClose);
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content" ref={modalRef}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button onClick={onClose} className="modal__close">✕</button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;