import cx from 'classnames';
import React from 'react';
import styles from './GridContainer.module.scss';

const GridContainer = ({ children }) => (
  <div className={cx(styles.root)}>{children}</div>
);

export default GridContainer;
