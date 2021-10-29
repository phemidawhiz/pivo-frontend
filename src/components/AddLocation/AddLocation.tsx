import React from 'react';
import { composeClasses } from 'utils/generic';
import styles from './AddLocation.scss'

const AddLocation: React.SFC<{listCart?: boolean}> = ({listCart}) => (
    <span className={listCart ? composeClasses(styles.cartWrapper, styles.listCart) : styles.cartWrapper}>
      VIEW
    </span>
  );

export default AddLocation;
