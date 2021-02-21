import cx from 'classnames';
import React from 'react';

import Peg from '../Peg';
import styles from './Tray.module.scss';

import { CHANGE_GUESS } from '../../../actions';
import { COLORS } from '../../../constants';
import { useStateValue } from '../../../store';

const Tray = () => {
  const [{ activeGuess, activePeg }, dispatch] = useStateValue();

  function updateColor(color) {
    if (activePeg.indexOf(true) > -1) {
      const newGuess = activeGuess.map((guess, idx) =>
        activePeg[idx] ? color : guess
      );
      dispatch({
        type: CHANGE_GUESS,
        payload: { data: newGuess },
      });
    }
  }

  return (
    <div className={cx(styles.root)}>
      {COLORS.map(color => (
        <Peg color={color} key={color} onClick={() => updateColor(color)}>
          {color}
        </Peg>
      ))}
    </div>
  );
};

export default Tray;
