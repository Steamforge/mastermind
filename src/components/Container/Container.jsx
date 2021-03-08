import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './Container.module.scss';

import { CHANGE_PEG } from '../../../actions';
import { INITIAL_STATE } from '../../../constants';
import { useStateValue } from '../../../store';

const Container = ({ children }) => {
  const [{ activePeg }, dispatch] = useStateValue();

  //all of this is remove the active state when clicked outside the container
  const observed = useRef(null);
  useEffect(() => {
    const handleClickOutside = e => {
      if (observed.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      dispatch({
        type: CHANGE_PEG,
        payload: { data: INITIAL_STATE.activePeg },
      });
    };

    if (activePeg.length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePeg, dispatch]);

  return (
    <div className={cx(styles.root)} ref={observed}>
      {children}
    </div>
  );
};

export default Container;
