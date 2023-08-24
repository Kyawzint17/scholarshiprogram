import React, { useState } from 'react';
import styles from './home.module.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    hours: '',
    students: '',
    datetime: '',
    location: '',
    details: '',
    qualification: '',
    contacts: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here, e.g., sending data to a server.
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles['create-text']}>Scholarship Work</h2>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit} className={styles['create-form']}>
            <div className={styles['form-columns-container']}>
              <div className={styles['form-column']}>
                <div className={styles['form-row']}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="hours">Scholarship Hours</label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="students">Limited Students Number</label>
                <input
                  type="number"
                  id="students"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="datetime">Date and Time of Work</label>
                <input
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="location">Location of Work</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                </div>
                {/* ... Other form rows for the first column */}
              </div>

              <div className={styles['form-column']}>

                <div className={styles['form-row']}>
                <label htmlFor="details">Details</label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="12"
                    cols="50"
                    required
                  ></textarea>
               
              
                </div>
                {/* ... Other form rows for the second column */}
              </div>
              
            </div>

            <div className={styles['form-button-container']}>
              <div className={styles['button-wrapper']}>
                <button onClick={onClose}>Close</button>
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
