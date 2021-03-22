import cx from 'classnames';
import React from 'react';

import * as styles from './Scoreboard.module.scss';

import { convertTime } from '../../../utils';
import { useStateValue } from '../../../store';

const Scoreboard = () => {
  const [{ scores }] = useStateValue();
  return (
    <div className={cx(styles.root)}>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Win</th>
            <th>Guesses</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, idx) => (
            <tr key={idx}>
              <td>{score?.id + 1}</td>
              <td>{score?.win ? 'Yes' : 'No'}</td>
              <td>{score?.guesses}</td>
              <td>{convertTime(score?.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
