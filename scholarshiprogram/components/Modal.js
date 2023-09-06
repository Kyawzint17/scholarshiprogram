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
    datetime: [],
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

  
  const addDateTime = () => {
    setFormData((prevData) => ({
      ...prevData,
      datetime: [...prevData.datetime, ''], // Add an empty string for a new date-time input
    }));
  };

  const handleDateTimeChange = (index, value) => {
    const newDateTime = [...formData.datetime];
    newDateTime[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      datetime: newDateTime,
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

                <div className={styles['add-button-wrapper']}>
                  <button type="button" onClick={addDateTime}>
                    Add Date and Time
                  </button>
                </div>

                {formData.datetime.map((dateTime, index) => (
                    <div key={index}>
                      <label htmlFor={`datetime${index}`}>
                        Date and Time of Work #{index + 1}
                      </label>
                      <input
                        type="datetime-local"
                        id={`datetime${index}`}
                        name={`datetime${index}`}
                        value={dateTime}
                        onChange={(e) => handleDateTimeChange(index, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                {/* ... Other form rows for the first column */}
              </div>

              <div className={styles['form-column']}>

                <div className={styles['form-row']}>
                <label htmlFor="details">Description</label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="7"
                    cols="50"
                    required
                  ></textarea>

                <label htmlFor="qualifications">Qualifiation</label>
                  <textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    rows="7"
                    cols="50"
                    required
                  ></textarea>

                <label htmlFor="contacts">Contact</label>
                  <textarea
                    id="contacts"
                    name="contacts"
                    value={formData.contacts}
                    onChange={handleChange}
                    rows="7"
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
