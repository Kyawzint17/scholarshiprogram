// components/NumberBox.js

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const NumberBox = ({ number }) => {
  console.log('NumberBox received number:', number);
  return (
    <div className={styles.numberBox}>
      <span>{number}</span>
    </div>
  );
};

NumberBox.propTypes = {
  number: PropTypes.number.isRequired,
};

export default NumberBox;
