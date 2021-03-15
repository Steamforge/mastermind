import cx from 'classnames';
import React from 'react';
import styles from './Peg.module.scss';

const Peg = ({
  active,
  color,
  currentRow,
  onClick,
  provided,
  style,
  snapshot,
}) => {
  const rootStyles = cx(
    styles.root,
    styles[color],
    { [styles.active]: active },
    { [styles.link]: onClick },
    { [styles.current]: currentRow },
    { [styles.stop]: !snapshot?.isDragging },
    { [styles.active]: snapshot?.isDragging },
    { [styles.over]: snapshot?.isDraggingOver }
  );
  return (
    <div
      className={rootStyles}
      onClick={onClick}
      ref={provided?.innerRef}
      style={style}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      {...provided?.droppableProps}
    >
      {color?.toUpperCase()}
    </div>
  );
};

export default Peg;
