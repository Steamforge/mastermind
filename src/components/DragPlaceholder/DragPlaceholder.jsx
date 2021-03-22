import cx from 'classnames';
import React from 'react';

import * as styles from './DragPlaceholder.module.scss';

const DragPlaceholder = ({ provided }) => (
  <span className={cx(styles.root)}>{provided.placeholder}</span>
);

export default DragPlaceholder;
