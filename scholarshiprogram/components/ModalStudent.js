// components/StudentModal.js
import React from 'react';
import styles from '../styles/StudentModal.module.css'; // Create a separate CSS file for modal styles

function StudentModal({ isOpen, onClose, student }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
        </button>
        <div className={styles.modalBody}>
          <h2>Student Information</h2>
          {/*<img className={styles.modalImage} src={student.profileImage} alt={student.name} /> */}

          <p className={styles.paraText}><strong>Name:</strong> {student.name}</p>
          <p className={styles.paraText}><strong>Email:</strong> {student.email}</p>

          {/* Add more student information here */}
        </div>
      </div>
    </div>
  );
}

export default StudentModal;
