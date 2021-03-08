import cx from 'classnames';
import React from 'react';
import styles from './RowNum.module.scss';

const RowNum = ({ num }) => <div className={cx(styles.root)}>{num}</div>;

export default RowNum;
