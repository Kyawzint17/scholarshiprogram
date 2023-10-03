import React from 'react';
import styles from '../styles/DeleteModal.module.css';
import { useRouter } from 'next/router'; // Import useRouter

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const router = useRouter(); // Initialize useRouter

  const handleCancel = () => {
    onClose(); // Close the modal
  };

  return (
    <div className={isOpen ? styles.modalOverlay : styles.hidden}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Confirm Deletion</h2>
        <p className={styles.paragraph}>Are you sure you want to delete this item?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onDelete}>
            Delete
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
