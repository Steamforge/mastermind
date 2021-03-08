import cx from 'classnames';
import React from 'react';
import styles from './DragPlaceholder.module.scss';

const DragPlaceholder = ({ provided }) => (
  <span className={cx(styles.root)}>{provided.placeholder}</span>
);

export default DragPlaceholder;
