import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import Peg from '../Peg';
import styles from './Row.module.scss';

import { HINT_COLORS, PEG_COUNT, ROUNDS } from '../../../constants';
import { CHANGE_WIN } from '../../../actions';
import { useStateValue } from '../../../store';

const Row = ({ row, rowNum }) => {
  const [{ code, currentRound, winGame }, dispatch] = useStateValue();
  const [guessHints, setHints] = useState(new Map());

  useEffect(() => {
    const newHints = new Map([
      [HINT_COLORS.RED, 0],
      [HINT_COLORS.WHITE, 0],
      [HINT_COLORS.NONE, 4],
    ]);
    const codeList = new Map();
    const guessList = new Map();

    //count the colors in the code
    code.forEach(c =>
      codeList.set(
        c.color,
        codeList.has(c.color) ? codeList.get(c.color) + 1 : 1
      )
    );

    //count the colors in the guess
    //find color/position matching
    row.forEach((color, idx) => {
      guessList.set(color, guessList.has(color) ? guessList.get(color) + 1 : 1);
      if (color === code[idx].color) {
        newHints.set(HINT_COLORS.RED, newHints.get(HINT_COLORS.RED) + 1);
      }
    });

    //find color matching
    guessList.forEach((value, key) => {
      if (codeList.has(key)) {
        newHints.set(
          HINT_COLORS.WHITE,
          newHints.get(HINT_COLORS.WHITE) + Math.min(value, codeList.get(key))
        );
      }
    });

    //subtract red hints from all the white
    newHints.set(
      HINT_COLORS.WHITE,
      newHints.get(HINT_COLORS.WHITE) - newHints.get(HINT_COLORS.RED)
    );

    //subtract red/white hints from none
    newHints.set(
      HINT_COLORS.NONE,
      newHints.get(HINT_COLORS.NONE) -
        newHints.get(HINT_COLORS.RED) -
        newHints.get(HINT_COLORS.WHITE)
    );

    setHints(newHints);

    //win game
    if (newHints.get(HINT_COLORS.RED) === PEG_COUNT) {
      dispatch({
        type: CHANGE_WIN,
        payload: { data: { win: true, show: true } },
      });
    }
    if (!winGame && currentRound === ROUNDS) {
      dispatch({
        type: CHANGE_WIN,
        payload: { data: { win: false, show: true } },
      });
    }
  }, [code, currentRound, dispatch, row, winGame]);

  function getHint(type, count) {
    return [...Array(count).keys()].map(hint => (
      <div className={cx(styles[type])} key={hint} />
    ));
  }

  const rowStyles = cx(styles.root, {
    [styles.win]: winGame && rowNum === currentRound - 1,
  });

  return (
    <div className={rowStyles}>
      <div className={cx(styles.rowNum)}>{rowNum + 1}</div>
      {row.map((color, idx) => (
        <Peg color={color} key={`${idx}${color}`} />
      ))}
      <div className={cx(styles.keyContainer)}>
        {Array.from(guessHints.keys()).map(hint =>
          getHint(hint, guessHints.get(hint))
        )}
      </div>
    </div>
  );
};

export default Row;
