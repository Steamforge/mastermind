import cx from 'classnames';
import React from 'react';

import Peg from '../Peg';
import styles from './Row.module.scss';

const Row = ({ row }) => (
  <div className={cx(styles.root)}>
    {row.map((color, idx) => (
      <Peg color={color} key={`${idx}${color}`} />
    ))}
  </div>
);

export default Row;
