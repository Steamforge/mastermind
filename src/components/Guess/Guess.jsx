import cx from 'classnames';
import { Droppable } from 'react-beautiful-dnd';
import React from 'react';

import Peg from '../Peg';
import Row from '../Row';
import RowNum from '../RowNum';
import styles from './Guess.module.scss';

import { PEG_COUNT, ROUNDS } from '../../../constants';
import { CHANGE_PEG } from '../../../actions';
import { getArrayFromNum } from '../../../utils';
import { useStateValue } from '../../../store';

const Guess = () => {
  const [
    { activeGuess, activePeg, code, currentRound, guessedRows, winGame },
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

  const guessStyles = cx(
    styles.guess,
    {
      [styles.lastGuess]: currentRound === ROUNDS - 1,
    },
    {
      [styles.blink]:
        activeGuess.filter(a => a === null).length === PEG_COUNT &&
        currentRound < ROUNDS - 1,
    }
  );

  const isNewGame = () => code.length === 0;
  const isRoundNotOver = () => currentRound < ROUNDS;
  const showGuess = () => !isNewGame() && !winGame && isRoundNotOver();

  //empty pegs
  const getEmptyPegs = pegCount =>
    getArrayFromNum(pegCount).map(peg => <Peg key={peg} />);

  //empty key pegs
  const getEmptyKeyPegs = pegCount => (
    <div className={cx(styles.keyContainer)}>
      {getArrayFromNum(pegCount).map(peg => (
        <div className={cx(styles.n)} key={peg} />
      ))}
    </div>
  );

  //guessed rows
  const getGuessedRows = rows =>
    rows.map((row, idx) => <Row key={`row${idx}`} row={row} rowNum={idx} />);

  return (
    <div className={cx(styles.root)}>
      {getGuessedRows(guessedRows)}

      {showGuess() && (
        <div className={guessStyles}>
          <RowNum num={currentRound + 1} />
          {activeGuess.map((color, idx) => (
            <Droppable droppableId={`guess${idx}`} key={`${idx}${color}`}>
              {provided => (
                <>
                  <Peg
                    active={activePeg[idx]}
                    color={color}
                    currentRow
                    onClick={() => updatePeg(idx)}
                    provided={provided}
                  />
                  <span className={cx(styles.none)}>
                    {provided.placeholder}
                  </span>
                </>
              )}
            </Droppable>
          ))}

          {getEmptyKeyPegs(PEG_COUNT)}
        </div>
      )}

      {isRoundNotOver() &&
        getArrayFromNum(
          ROUNDS - guessedRows.length - (!winGame && !isNewGame() ? 1 : 0)
        ).map(rowLeft => (
          <div className={cx(styles.row)} key={rowLeft}>
            <RowNum
              num={
                currentRound + 1 + rowLeft + (!winGame && !isNewGame() ? 1 : 0)
              }
            />
            {getEmptyPegs(PEG_COUNT)}
            {getEmptyKeyPegs(PEG_COUNT)}
          </div>
        ))}
    </div>
  );
};

export default Guess;
