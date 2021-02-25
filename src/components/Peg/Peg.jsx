import cx from 'classnames';
import React from 'react';
import styles from './Peg.module.scss';

const Peg = ({ active, color, onClick, currentRow }) => {
  const rootStyles = cx(
    styles.root,
    styles[color],
    { [styles.active]: active },
    { [styles.link]: onClick },
    { [styles.current]: currentRow }
  );
  return (
    <div className={rootStyles} onClick={onClick}>
      {color?.toUpperCase()}
    </div>
  );
};

export default Peg;
