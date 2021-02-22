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

  useEffect(() => {
    dispatch({
      type: CHANGE_CODE,
      payload: { data: getCode(PEG_COUNT, COLORS) },
    });
  }, [dispatch]);

  const getPeg = ({ color, id }) => <Peg color={color} key={id} />;

  return <div className={cx(styles.root)}>{code.map(getPeg)}</div>;
};

export default Code;
