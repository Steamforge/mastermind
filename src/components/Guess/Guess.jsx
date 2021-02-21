import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import Peg from '../Peg';
import Row from '../Row';
import styles from './Guess.module.scss';

import {
  CHANGE_CODE,
  CHANGE_GUESS,
  CHANGE_PEG,
  CHANGE_ROW,
} from '../../../actions';
import { COLORS, INITIAL_STATE, PEG_COUNT } from '../../../constants';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

const Guess = () => {
  const [{ activeGuess, activePeg, guessedRows }, dispatch] = useStateValue();

  function updatePeg(peg) {
    const newPeg = [...activePeg];
    newPeg[peg] = !newPeg[peg];
    dispatch({
      type: CHANGE_PEG,
      payload: { data: newPeg },
    });
  }

  function clearGuess() {
    dispatch({
      type: CHANGE_GUESS,
      payload: { data: INITIAL_STATE.activeGuess },
    });
    dispatch({
      type: CHANGE_PEG,
      payload: { data: INITIAL_STATE.activePeg },
    });
  }

  function submitGuess() {
    if (activeGuess.indexOf(null) === -1) {
      const newRows = [...guessedRows, activeGuess];
      dispatch({
        type: CHANGE_ROW,
        payload: { data: newRows },
      });
      clearGuess();
    }
  }

  function resetGame() {
    clearGuess();
    dispatch({
      type: CHANGE_ROW,
      payload: { data: INITIAL_STATE.guessedRows },
    });
    dispatch({
      type: CHANGE_CODE,
      payload: { data: getCode(PEG_COUNT, COLORS) },
    });
  }

  return (
    <>
      {guessedRows.map((row, idx) => (
        <Row key={`row${idx}`} row={row} />
      ))}

      <div className={cx(styles.root)}>
        {activeGuess.map((color, idx) => (
          <Peg
            active={activePeg[idx]}
            color={color}
            key={`${idx}${color}`}
            onClick={() => updatePeg(idx)}
          />
        ))}
        <Button buttonType="primary" onClick={clearGuess}>
          Clear Row
        </Button>
        <Button buttonType="green" onClick={submitGuess}>
          Make Guess
        </Button>
        <Button buttonType="error" onClick={resetGame}>
          Reset Game
        </Button>
      </div>
    </>
  );
};

export default Guess;
