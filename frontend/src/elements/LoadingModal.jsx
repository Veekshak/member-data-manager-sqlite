import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function LoadingModal({ children, onClose, ...props }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose} {...props}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
