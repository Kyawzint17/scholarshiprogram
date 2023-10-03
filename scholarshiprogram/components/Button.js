import React from 'react';
import styles from './home.module.css';

const Button = ({ onClick }) => {
  return <button  onClick={onClick} >Create Scholarship Work</button>;
};

export default Button;