import Button from '../Button';
import cx from 'classnames';
import React from 'react';
import styles from './Nav.module.scss';

import {
  CHANGE_WIN,
  RESET_GAME,
  SUBMIT_GUESS,
  UPDATE_GUESS_ROW,
  UPDATE_SCORE,
} from '../../../actions';
import { COLORS, INITIAL_STATE, PEG_COUNT, ROUNDS } from '../../../constants';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

const Nav = () => {
  const [
    {
      activeGuess,
      code,
      currentRound,
      currentTime,
      guessedRows,
      scores,
      winGame,
    },
    dispatch,
  ] = useStateValue();

  const MESSAGE = {
    LOSE: 'Try Again!',
    WIN: 'You Win!',
  };

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

  const getElapsedTime = time => Math.abs(Date.now() - time);

  function checkWin() {
    //win game
    const isWin = () =>
      code.filter((c, idx) => c.color === activeGuess[idx]).length ===
      PEG_COUNT;

    if (isWin()) {
      dispatch({
        type: CHANGE_WIN,
        payload: { data: { win: true, show: true } },
      });
      const newScore = [
        ...scores,
        {
          id: scores.length,
          win: true,
          guesses: currentRound + 1,
          time: getElapsedTime(currentTime),
        },
      ];
      dispatch({
        type: UPDATE_SCORE,
        payload: newScore,
      });
    }

    if (!isWin() && currentRound === ROUNDS - 1) {
      dispatch({
        type: CHANGE_WIN,
        payload: { data: { win: false, show: true } },
      });

      const newScore = [
        ...scores,
        {
          id: scores.length,
          win: false,
          guesses: ROUNDS,
          time: getElapsedTime(currentTime),
        },
      ];
      dispatch({
        type: UPDATE_SCORE,
        payload: newScore,
      });
    }
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
      checkWin();
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
          time: Date.now(),
          win: INITIAL_STATE.winGame,
        },
      },
    });
  }

  const isNewGame = () => code.length === 0;
  const showCopy = () =>
    !winGame &&
    guessedRows.length > 0 &&
    currentRound !== ROUNDS &&
    !isNewGame();
  const showGuess = () => !winGame && currentRound !== ROUNDS && !isNewGame();

  const getMessage = message => (
    <div className={cx(styles.game)}>{message}</div>
  );

  return (
    <div className={cx(styles.root)}>
      <div className={cx(styles.nav)}>
        {winGame && getMessage(MESSAGE.WIN)}
        {!winGame && currentRound === ROUNDS && getMessage(MESSAGE.LOSE)}

        {showCopy() && (
          <Button label="Copy" onClick={() => updateGuessRow('copy')} />
        )}

        {showGuess() && (
          <>
            <Button
              buttonType="primary"
              label="Clear"
              onClick={updateGuessRow}
            />
            <Button buttonType="green" label="Guess" onClick={submitGuess} />
          </>
        )}

        <Button
          buttonType={winGame || isNewGame() ? 'green' : 'error'}
          label="New"
          onClick={resetGame}
        />
      </div>
    </div>
  );
};

export default Nav;
