import cx from 'classnames';
import React from 'react';
import styles from './Peg.module.scss';

const Peg = ({ active, color, onClick }) => (
  <div
    className={cx(
      styles.root,
      styles[color],
      { [styles.active]: active },
      { [styles.link]: onClick }
    )}
    onClick={onClick}
  >
    {color}
  </div>
);

export default Peg;
