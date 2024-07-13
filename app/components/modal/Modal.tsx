import {ReactNode} from "react"
import {createPortal} from "react-dom"
import styles from "./Modal.module.css"

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}


export const Modal = ({ isOpen, children }:ModalProps) => {
  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement // Ensure this element exists in your HTML
  );
};
