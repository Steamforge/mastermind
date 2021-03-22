import cx from 'classnames';
import React from 'react';

import * as styles from './RowNum.module.scss';

const RowNum = ({ num }) => <div className={cx(styles.root)}>{num}</div>;

export default RowNum;
