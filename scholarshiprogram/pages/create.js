import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../components/create.module.css';
import CreateNavBar from '@/components/createNavbar';

export default function Create() {
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
    <>
      <CreateNavBar />
      <div className={styles['create-page']}>
        <section className={`text-gray-600 body-font ${styles['section-center']}`}>
          <h2 className={styles['create-text']}>
            Create Scholarship Work
          </h2>
          <div className={styles['form-container']}>
            <form onSubmit={handleSubmit} className={styles['create-form']}>
              <div className={styles['form-column']}>
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

                <label htmlFor="details">Details</label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                  required
                ></textarea>

                <label htmlFor="qualification">Qualification</label>
                <textarea
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                  required
                ></textarea>

                <label htmlFor="contacts">Contacts</label>
                <textarea
                  id="contacts"
                  name="contacts"
                  value={formData.contacts}
                  onChange={handleChange}
                  rows="3"
                  cols="20"
                  required
                ></textarea>
              </div>

              <div className={styles['form-button-container']}>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
