import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import { DragDropContext } from 'react-beautiful-dnd';
import styles from './Container.module.scss';

import { CHANGE_PEG, UPDATE_GUESS_ROW } from '../../../actions';
import { INITIAL_STATE } from '../../../constants';
import { useStateValue } from '../../../store';

const Container = ({ children }) => {
  const [{ activeGuess, activePeg }, dispatch] = useStateValue();

  const observed = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (observed.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      dispatch({
        type: CHANGE_PEG,
        payload: { data: INITIAL_STATE.activePeg },
      });
    };

    if (activePeg.length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePeg, dispatch]);

  const onDragEnd = e => {
    const dropId = e.destination.droppableId;
    const newGuess = [...activeGuess];
    newGuess[dropId.charAt(dropId.length - 1)] = e.draggableId;
    dispatch({
      type: UPDATE_GUESS_ROW,
      payload: { data: { guess: newGuess, peg: INITIAL_STATE.activePeg } },
    });
  };

  return (
    <div className={cx(styles.root)} ref={observed}>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </div>
  );
};

export default Container;
