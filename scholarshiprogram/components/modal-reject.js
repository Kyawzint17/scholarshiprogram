// Modal.js
import React, { useState }from 'react';
import styles from'../styles/Modal.module.css'

const Modal = ({ isOpen, onClose, onConfirm }) => {
    const [rejectionReason, setRejectionReason] = useState('');
  
    const handleInputChange = (event) => {
      setRejectionReason(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (rejectionReason.length > 20) {
        onConfirm(rejectionReason);
        onClose();
      } else {
        alert('Rejection reason must be more than 20 characters.');
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>Reject Work</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="rejectionReason">Reason for Rejection:</label>
            <textarea
              id="rejectionReason"
              name="rejectionReason"
              value={rejectionReason}
              onChange={handleInputChange}
              placeholder="Enter your reason for rejection"
              required
            />
            <div className={styles.buttonContainer}>
              <button className={styles.confirmButton} type="submit">
                Confirm
              </button>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.closeButton} onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Modal;
