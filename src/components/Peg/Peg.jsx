import cx from 'classnames';
import React from 'react';
import styles from './Peg.module.scss';

const Peg = ({ active, color, onClick }) => {
  const rootStyles = cx(
    styles.root,
    styles[color],
    { [styles.active]: active },
    { [styles.link]: onClick }
  );
  return (
    <div className={rootStyles} onClick={onClick}>
      {color?.toUpperCase()}
    </div>
  );
};

export default Peg;
