import cx from 'classnames';
import React from 'react';
import styles from './Scoreboard.module.scss';

import { useStateValue } from '../../../store';

const convertTime = time => {
  const min = Math.floor(time / 60000);
  const sec = ((time % 60000) / 1000).toFixed(0);
  return `${min} : ${sec < 10 ? 0 : ''}${sec}`;
};

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
