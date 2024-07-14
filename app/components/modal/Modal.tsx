import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.05,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-root') as HTMLElement // Ensure this element exists in your HTML
  );
};
