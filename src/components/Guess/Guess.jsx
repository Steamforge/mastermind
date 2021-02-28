import cx from 'classnames';
import { Droppable } from 'react-beautiful-dnd';
import React from 'react';

import Peg from '../Peg';
import Row from '../Row';
import styles from './Guess.module.scss';

import { PEG_COUNT, ROUNDS } from '../../../constants';
import { CHANGE_PEG } from '../../../actions';
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

  return (
    <div className={cx(styles.root)}>
      {guessedRows.map((row, idx) => (
        <Row key={`row${idx}`} row={row} rowNum={idx} />
      ))}

      {!winGame && currentRound < ROUNDS && (
        <div className={guessStyles}>
          <div className={cx(styles.rowNum)}>{currentRound + 1}</div>
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
          <div className={cx(styles.keyContainer)}>
            <div className={cx(styles.n)} />
            <div className={cx(styles.n)} />
            <div className={cx(styles.n)} />
            <div className={cx(styles.n)} />
          </div>
        </div>
      )}

      {currentRound < ROUNDS &&
        [...Array(ROUNDS - guessedRows.length - (!winGame ? 1 : 0)).keys()].map(
          rowLeft => (
            <div className={cx(styles.row)} key={rowLeft}>
              <div className={cx(styles.rowNum)}>
                {currentRound + 1 + rowLeft + (!winGame ? 1 : 0)}
              </div>
              {[...Array(PEG_COUNT).keys()].map(peg => (
                <Peg key={peg} />
              ))}
              <div className={cx(styles.keyContainer)}>
                <div className={cx(styles.n)} />
                <div className={cx(styles.n)} />
                <div className={cx(styles.n)} />
                <div className={cx(styles.n)} />
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Guess;
