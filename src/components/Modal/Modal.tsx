import { composeClasses } from 'lib/utils';
import React from 'react';

import styles from './Modal.scss';

interface IModalProps {
  closeModal: () => void;
  Icon?: any;
  subtitle?: string;
  title?: string;
  visible: boolean;
  wide?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  closeModal,
  Icon,
  subtitle,
  title,
  visible,
  wide
}) => {
  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={closeModal}
      />

      <div className={(wide) ? composeClasses(styles.modal, styles.wideModal) : styles.modal }>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <hr />
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
