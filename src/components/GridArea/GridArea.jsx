import cx from 'classnames';
import React from 'react';
import styles from './GridArea.module.scss';

const GridArea = ({ area, children }) => (
  <div className={cx(styles.root, styles[area])}>{children}</div>
);

export default GridArea;
