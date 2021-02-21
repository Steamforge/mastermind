import cx from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, onClick, buttonType }) => (
  <button className={cx(styles.root, styles[buttonType])} onClick={onClick}>
    {children}
  </button>
);

export default Button;
