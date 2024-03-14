// modal-apply.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from'../styles/Modal.module.css'

const ApplyModal = ({ isVisible, onClose, onApply, dateTimes }) => {
  const [selectedDateTimeIndex, setSelectedDateTimeIndex] = useState(0);

  const handleApply = () => {
    const selectedDateTime = dateTimes[selectedDateTimeIndex];
    onApply(selectedDateTime);
    onClose();
  };

  return (
    isVisible && (
      <div className="modal-overlay">
        <div className={styles.modal}>
          <h3 className={styles.h3}>Select Date and Time</h3>
          <ul>
            {dateTimes.map((dateTime, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={index}
                    checked={selectedDateTimeIndex === index}
                    onChange={() => setSelectedDateTimeIndex(index)}
                  />
                  {`${dateTime.startDate} - ${dateTime.startTime} to ${dateTime.endDate} - ${dateTime.endTime}`}
                </label>
                {dateTime.scholarshipHours && (
                  <span> | Scholarship Hours: {dateTime.scholarshipHours}</span>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.buttonContainer}>
                <button className={styles.applyButton} onClick={handleApply}>Apply</button>
                <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
          
        </div>
      </div>
    )
  );
};

export default ApplyModal;
