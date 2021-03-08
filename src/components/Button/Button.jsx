import cx from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

const Button = ({ buttonType, children, label, onClick }) => (
  <button className={cx(styles.root, styles[buttonType])} onClick={onClick}>
    {label || children}
  </button>
);

export default Button;
