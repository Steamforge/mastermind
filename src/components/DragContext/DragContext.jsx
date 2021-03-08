import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { INITIAL_STATE } from '../../../constants';
import { UPDATE_GUESS_ROW } from '../../../actions';
import { useStateValue } from '../../../store';

const DragContext = ({ children }) => {
  const [{ activeGuess }, dispatch] = useStateValue();

  //update the guess when a color is dragged
  const onDragEnd = e => {
    const dropId = e.destination?.droppableId;
    if (dropId) {
      const newGuess = [...activeGuess];
      newGuess[dropId.charAt(dropId.length - 1)] = e.draggableId;
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
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DragContext;
