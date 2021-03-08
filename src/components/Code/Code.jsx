import cx from 'classnames';
import Peg from '../Peg';
import React from 'react';
import styles from './Code.module.scss';

import { getArrayFromNum } from '../../../utils';
import { PEG_COUNT } from '../../../constants';
import { useStateValue } from '../../../store';

const Code = ({ show }) => {
  const [{ code, showCode }] = useStateValue();

  const isShown = () => show || showCode;

  const getPeg = ({ color, id }) => (
    <Peg color={isShown() ? color : 'x'} key={id} />
  );

  const getCode = () => {
    if (code.length === 0) {
      return getArrayFromNum(PEG_COUNT).map(peg => ({
        color: null,
        id: peg,
      }));
    }
    return code;
  };

  return <div className={cx(styles.root)}>{getCode().map(getPeg)}</div>;
};

export default Code;
