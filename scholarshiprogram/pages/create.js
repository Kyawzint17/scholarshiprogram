import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Create.module.css';
import CreateNavBar from '/components/createNavbar';
import { useRouter } from 'next/router';

export default function Create() {
  const [formData, setFormData] = useState({
    picture: null,
    title: '',
    hours: '',
    students: '',
    datetime: [{ start: '', end: '' , scholarshipHours: ''}], // Initialize with one empty date-time field
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

  const handlePictureChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file (if multiple files are allowed)

    // You can store the file in the form data or handle it as needed.
    setFormData((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const addDateTime = () => {
    setFormData((prevData) => ({
      ...prevData,
      datetime: [...prevData.datetime, { start: '', end: '' }], // Add an empty date-time field
    }));
  };

  const removeDateTime = (index) => {
    const newDateTime = [...formData.datetime];
    newDateTime.splice(index, 1); // Remove the date-time field at the specified index
    setFormData((prevData) => ({
      ...prevData,
      datetime: newDateTime,
    }));
  };

  const handleDateTimeChange = (index, field, value) => {
    const newDateTime = [...formData.datetime];
    newDateTime[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      datetime: newDateTime,
    }));
  };

  return (
    <>
      <CreateNavBar />
      <div className={styles['create-page']}>
        <h2 className={styles['create-text']}>
          Create Scholarship Work
        </h2>
        <div className={styles['praent=-container']}>
          <div className={styles['float-child']}>
            <div className={styles['upload-pic']}>
              <label htmlFor="picture">Upload Picture</label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                onChange={handlePictureChange}
              />
            </div>
          </div>


          <div className={styles['float-child']}>
            <div className={styles['form-container']}>
              <form onSubmit={handleSubmit} className={styles['create-form']}>
                <div className={styles['form-column']}>



                  <div className={styles['container-form']}>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />

                    {formData.datetime.map((dateTime, index) => (
                      <div key={index}>
                        <label htmlFor={`start${index}`}>Start Date and Time of Work {index + 1}</label>
                        <input
                          type="datetime-local"
                          id={`start${index}`}
                          name={`start${index}`}
                          value={dateTime.start}
                          onChange={(e) => handleDateTimeChange(index, 'start', e.target.value)}
                          required
                        />

                        <label htmlFor={`end${index}`}>End Date and Time of Work {index + 1}</label>
                        <input
                          type="datetime-local"
                          id={`end${index}`}
                          name={`end${index}`}
                          value={dateTime.end}
                          onChange={(e) => handleDateTimeChange(index, 'end', e.target.value)}
                          required
                        />

                        <label htmlFor={`hours${index}`}>Scholarship Hours for Work {index + 1}</label>
                        <input
                          type="number"
                          id={`hours${index}`}
                          name={`hours${index}`}
                          value={dateTime.hours}
                          onChange={(e) => handleDateTimeChange(index, 'hours', e.target.value)}
                          required
                        />
                        
                        <button className={['remove-box']} type="button" onClick={() => removeDateTime(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <div>
                      <button className={styles['datetime-box']} type="button" onClick={addDateTime}>
                        Add Date and Time
                      </button>
                    </div>

                    <label htmlFor="location">Location of Work</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="details">Description</label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows="4"
                      cols="30"
                      required
                    ></textarea>

                    <label htmlFor="qualification">Qualification</label>
                    <textarea
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      rows="4"
                      cols="30"
                      required
                    ></textarea>

                    <label htmlFor="contacts">Contacts</label>
                    <textarea
                      id="contacts"
                      name="contacts"
                      value={formData.contacts}
                      onChange={handleChange}
                      rows="4"
                      cols="30"
                      required
                    ></textarea>
                  </div>
                  <div className={styles['form-button-container']}>
                    <input type="submit" value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
