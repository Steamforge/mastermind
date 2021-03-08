import { Draggable, Droppable } from 'react-beautiful-dnd';
import cx from 'classnames';
import React from 'react';

import Peg from '../Peg';
import styles from './Tray.module.scss';

import {
  CHANGE_CURRENT_PEG,
  CHANGE_GUESS,
  UPDATE_GUESS_ROW,
} from '../../../actions';
import { COLORS, INITIAL_STATE, PEG_COUNT } from '../../../constants';
import { useStateValue } from '../../../store';

const Tray = () => {
  const [{ activeGuess, activePeg, currentPeg }, dispatch] = useStateValue();

  function updateColor(color) {
    if (activePeg.indexOf(true) > -1) {
      const newGuess = activeGuess.map((guess, idx) =>
        activePeg[idx] ? color : guess
      );
      dispatch({
        type: UPDATE_GUESS_ROW,
        payload: {
          data: {
            current: INITIAL_STATE.currentPeg,
            guess: newGuess,
            peg: INITIAL_STATE.activePeg,
          },
        },
      });
    } else {
      const newGuess = [...activeGuess];
      newGuess[currentPeg] = color;
      dispatch({
        type: CHANGE_GUESS,
        payload: { data: newGuess },
      });
      dispatch({
        type: CHANGE_CURRENT_PEG,
        payload: {
          data:
            currentPeg === PEG_COUNT - 1
              ? INITIAL_STATE.currentPeg
              : currentPeg + 1,
        },
      });
    }
  }

  const getPeg = (color, index) => (
    <Draggable draggableId={color} index={index} key={color}>
      {(provided, snapshot) => (
        <>
          <Peg
            color={color}
            onClick={() => updateColor(color)}
            provided={provided}
            snapshot={snapshot}
          />
          {snapshot.isDragging && (
            <Peg
              active
              color={color}
              style={{ transform: 'none !important' }}
            />
          )}
        </>
      )}
    </Draggable>
  );

  return (
    <Droppable droppableId="colors" isDropDisabled>
      {provided => (
        <div className={cx(styles.root)}>
          <div
            className={cx(styles.tray)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {COLORS.map((color, index) => getPeg(color, index))}
            <span className={cx(styles.none)}>{provided.placeholder}</span>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Tray;
