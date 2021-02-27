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
        payload: { data: { guess: newGuess, peg: INITIAL_STATE.activePeg } },
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

  const getPeg = color => (
    <Peg color={color} key={color} onClick={() => updateColor(color)} />
  );

  return <div className={cx(styles.root)}>{COLORS.map(getPeg)}</div>;
};

export default Tray;
