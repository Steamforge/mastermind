import cx from 'classnames';
import Peg from '../Peg';
import React from 'react';

import * as styles from './Code.module.scss';

import { getArrayFromNum } from '../../../utils';
import { PEG_COUNT } from '../../../constants';
import { useStateValue } from '../../../store';

const Code = ({ show }) => {
  const [{ code, showCode }] = useStateValue();

  //show the code on game end or through prop
  const isShown = () => show || showCode;

  //build a peg
  const getPeg = ({ color, id }) => (
    <Peg color={isShown() ? color : 'x'} key={id} />
  );

  //build an empty code if there isn't one
  const getCode = () => {
    if (code.length === 0) {
      return getArrayFromNum(PEG_COUNT).map(peg => ({
        color: null,
        id: peg,
      }));
    }
    return code;
  };

  return (
    <div className={cx(styles.root, { [styles.active]: isShown() })}>
      {getCode().map(getPeg)}
    </div>
  );
};

export default Code;
