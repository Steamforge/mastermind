import React, { useEffect } from 'react';
import cx from 'classnames';
import styles from './Code.module.scss';

import { CHANGE_CODE } from '../../../actions';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

const COLORS = ['a', 'b', 'c', 'd', 'e', 'f']; //peg colors

const PEG_COUNT = 4; //number of pegs

const Colors = ({ code }) =>
  code.map(({ color, id }) => (
    <div className={cx(styles.color, styles[color])} key={id}>
      {color}
    </div>
  ));

const Code = () => {
  const [{ code }, dispatch] = useStateValue();
  const rootStyles = cx(styles.root);

  useEffect(() => {
    dispatch({
      type: CHANGE_CODE,
      payload: { data: getCode(PEG_COUNT, COLORS) },
    });
  }, [dispatch]);

  return (
    <div className={rootStyles}>
      <Colors code={code} />
    </div>
  );
};

export default Code;
