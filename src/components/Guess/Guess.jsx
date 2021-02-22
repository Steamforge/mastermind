import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import Peg from '../Peg';
import Row from '../Row';
import styles from './Guess.module.scss';

import {
  CHANGE_PEG,
  RESET_GAME,
  SUBMIT_GUESS,
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
        type: SUBMIT_GUESS,
        payload: {
          data: {
            guess: INITIAL_STATE.activeGuess,
            peg: INITIAL_STATE.activePeg,
            round: currentRound + 1,
            row: newRows,
          },
        },
      });
    }
  }

  //reset the game
  function resetGame() {
    dispatch({
      type: RESET_GAME,
      payload: {
        data: {
          code: getCode(PEG_COUNT, COLORS),
          guess: INITIAL_STATE.activeGuess,
          peg: INITIAL_STATE.activePeg,
          round: INITIAL_STATE.currentRound,
          row: INITIAL_STATE.guessedRows,
          win: INITIAL_STATE.winGame,
        },
      },
    });
  }

  return (
    <>
      <div className={cx(styles.root)}>
        {guessedRows.map((row, idx) => (
          <Row key={`row${idx}`} row={row} />
        ))}

        {!winGame && currentRound < ROUNDS && (
          <div className={cx(styles.guess)}>
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
          </div>
        )}

        {currentRound < ROUNDS &&
          [
            ...Array(ROUNDS - guessedRows.length - (!winGame ? 1 : 0)).keys(),
          ].map(row => (
            <div className={cx(styles.row)} key={row}>
              {[...Array(PEG_COUNT).keys()].map(peg => (
                <Peg key={peg} />
              ))}
            </div>
          ))}
      </div>

      <div className={cx(styles.game)}>
        {winGame && <div>You Win!</div>}

        {!winGame && currentRound === ROUNDS && <div>Try Again!</div>}

        <Button buttonType={winGame ? 'green' : 'error'} onClick={resetGame}>
          New Game
        </Button>
      </div>
    </>
  );
};

export default Guess;
