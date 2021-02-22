import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import Peg from '../Peg';
import styles from './Row.module.scss';

import { CHANGE_WIN } from '../../../actions';
import { useStateValue } from '../../../store';

const Row = ({ row }) => {
  const [{ code }, dispatch] = useStateValue();
  const [guessHints, setHints] = useState(new Map());

  useEffect(() => {
    const newHints = new Map([
      ['r', 0],
      ['w', 0],
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
        newHints.set('r', newHints.get('r') + 1);
      }
    });

    //find color matching
    guessList.forEach((value, key) => {
      if (codeList.has(key)) {
        newHints.set(
          'w',
          newHints.get('w') + Math.min(value, codeList.get(key))
        );
      }
    });

    //subtract red hints from all the white
    newHints.set('w', newHints.get('w') - newHints.get('r'));

    setHints(newHints);

    if (newHints.get('r') === 4) {
      dispatch({
        type: CHANGE_WIN,
        payload: { data: true },
      });
    }
  }, [code, dispatch, row]);

  function getHint(type, count) {
    return [...Array(count).keys()].map(hint => (
      <div className={cx(styles[type])} key={hint} />
    ));
  }

  return (
    <div className={cx(styles.root)}>
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
