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

  const getPeg = color => (
    <Peg color={color} key={color} onClick={() => updateColor(color)} />
  );

  return <div className={cx(styles.root)}>{COLORS.map(getPeg)}</div>;
};

export default Tray;
