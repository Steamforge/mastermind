import React, { useEffect } from 'react';
import cx from 'classnames';
import Peg from '../Peg';
import styles from './Code.module.scss';

import { COLORS, PEG_COUNT } from '../../../constants';
import { CHANGE_CODE } from '../../../actions';
import { getCode } from '../../../utils';
import { useStateValue } from '../../../store';

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
      {code.map(({ color, id }) => (
        <Peg color={color} key={id}>
          {color}
        </Peg>
      ))}
    </div>
  );
};

export default Code;
