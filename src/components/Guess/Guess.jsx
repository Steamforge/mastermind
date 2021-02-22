import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import Peg from '../Peg';
import Row from '../Row';
import styles from './Guess.module.scss';

import {
  CHANGE_CODE,
  CHANGE_PEG,
  CHANGE_ROUND,
  CHANGE_ROW,
  CHANGE_WIN,
  UPDATE_GUESS_ROW,
} from '../../../actions';
import { COLORS, INITIAL_STATE, PEG_COUNT, ROUNDS } from '../../../constants';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

const Guess = () => {
  const [
    { activeGuess, activePeg, currentRound, guessedRows, winGame },
    dispatch,
  ] = useStateValue();

  //active peg(s)
  function updatePeg(peg) {
    const newPeg = [...activePeg];
    newPeg[peg] = !newPeg[peg];
    dispatch({
      type: CHANGE_PEG,
      payload: { data: newPeg },
    });
  }

  //clear or copy
  function updateGuessRow(type) {
    dispatch({
      type: UPDATE_GUESS_ROW,
      payload: {
        data: {
          guess:
            type === 'copy'
              ? guessedRows[guessedRows.length - 1]
              : INITIAL_STATE.activeGuess,
          peg: INITIAL_STATE.activePeg,
        },
      },
    });
  }

  //make a guess
  function submitGuess() {
    if (activeGuess.indexOf(null) === -1) {
      const newRows = [...guessedRows, activeGuess];
      dispatch({
        type: CHANGE_ROW,
        payload: { data: newRows },
      });
      dispatch({
        type: CHANGE_ROUND,
        payload: { data: currentRound + 1 },
      });
      updateGuessRow();
    }
  }

  //reset the game
  function resetGame() {
    updateGuessRow();
    dispatch({
      type: CHANGE_ROUND,
      payload: { data: INITIAL_STATE.currentRound },
    });
    dispatch({
      type: CHANGE_ROW,
      payload: { data: INITIAL_STATE.guessedRows },
    });
    dispatch({
      type: CHANGE_CODE,
      payload: { data: getCode(PEG_COUNT, COLORS) },
    });
    dispatch({
      type: CHANGE_WIN,
      payload: { data: INITIAL_STATE.winGame },
    });
  }

  return (
    <>
      {guessedRows.map((row, idx) => (
        <Row key={`row${idx}`} row={row} />
      ))}

      {!winGame && currentRound < ROUNDS && (
        <div className={cx(styles.root)}>
          {activeGuess.map((color, idx) => (
            <Peg
              active={activePeg[idx]}
              color={color}
              key={`${idx}${color}`}
              onClick={() => updatePeg(idx)}
            />
          ))}
          <Button buttonType="primary" onClick={updateGuessRow}>
            Clear Row
          </Button>
          {guessedRows.length > 0 && (
            <Button onClick={() => updateGuessRow('copy')}>Copy Guess</Button>
          )}
          <Button buttonType="green" onClick={submitGuess}>
            Make Guess
          </Button>
          <Button buttonType="error" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      )}

      <div>
        {currentRound < ROUNDS &&
          [
            ...Array(ROUNDS - guessedRows.length - (!winGame ? 1 : 0)).keys(),
          ].map(row => (
            <div className={cx(styles.row)} key={row}>
              {[...Array(4).keys()].map(peg => (
                <Peg key={peg} />
              ))}
            </div>
          ))}
      </div>

      {winGame && (
        <div className={cx(styles.win)}>
          <div>You Win!</div>
          <Button buttonType="green" onClick={resetGame}>
            New Game
          </Button>
        </div>
      )}

      {!winGame && currentRound === ROUNDS && (
        <div className={cx(styles.win)}>
          <div>Try Again!</div>
          <Button buttonType="error" onClick={resetGame}>
            New Game
          </Button>
        </div>
      )}
    </>
  );
};

export default Guess;
