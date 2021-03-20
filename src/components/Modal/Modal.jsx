import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({ onClose, children }) =>
  ReactDOM.createPortal(
    <div className={cx(styles.root)} onClick={() => onClose()}>
      {children}
    </div>,
    document.body
  );

export default Modal;
