import Button from '../Button';
import cx from 'classnames';
import React from 'react';
import styles from './Nav.module.scss';

import { COLORS, INITIAL_STATE, PEG_COUNT, ROUNDS } from '../../../constants';
import { RESET_GAME, SUBMIT_GUESS, UPDATE_GUESS_ROW } from '../../../actions';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

const Nav = () => {
  const [
    { activeGuess, currentRound, guessedRows, winGame },
    dispatch,
  ] = useStateValue();

  //clear or copy
  function updateGuessRow(type) {
    dispatch({
      type: UPDATE_GUESS_ROW,
      payload: {
        data: {
          current: INITIAL_STATE.currentPeg,
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
            current: INITIAL_STATE.currentPeg,
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
          current: INITIAL_STATE.currentPeg,
          guess: INITIAL_STATE.activeGuess,
          peg: INITIAL_STATE.activePeg,
          round: INITIAL_STATE.currentRound,
          row: INITIAL_STATE.guessedRows,
          show: INITIAL_STATE.showCode,
          win: INITIAL_STATE.winGame,
        },
      },
    });
  }

  const showCopy = !winGame && guessedRows.length > 0;

  const rootStyles = cx(styles.root);
  return (
    <div className={rootStyles}>
      {winGame && <div className={cx(styles.game)}>You Win!</div>}
      {!winGame && currentRound === ROUNDS && (
        <div className={cx(styles.game)}>Try Again!</div>
      )}

      {!winGame && currentRound !== ROUNDS && (
        <Button buttonType="green" onClick={submitGuess}>
          Guess
        </Button>
      )}

      {showCopy && currentRound !== ROUNDS && (
        <Button onClick={() => updateGuessRow('copy')}>Copy</Button>
      )}

      {!winGame && currentRound !== ROUNDS && (
        <Button buttonType="primary" onClick={updateGuessRow}>
          Clear
        </Button>
      )}

      <Button buttonType={winGame ? 'green' : 'error'} onClick={resetGame}>
        New
      </Button>
    </div>
  );
};

export default Nav;
