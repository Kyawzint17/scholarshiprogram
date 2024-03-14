import React, { useState } from 'react';
import styles from '../styles/Create.module.css';
import CreateNavBar from '/components/createNavbar';
import { set } from 'mongoose';

export default function Create() {
  const url = "http://localhost:3000/api/posts/scholarshipWork";

  const [formData, setFormData] = useState({
    semester: "",
    picture: "https://upload.wikimedia.org/wikipedia/en/5/50/Assumption_University_of_Thailand_%28logo%29.png",
    title: "",
    start: "",
    end: "", 
    hours: "",
    location: "",
    limit:"",
    details: "",
    qualification: "",
    contacts: "",
    workStatus: "Pending",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    alert('Work created successfully');
    console.log(data);
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
        <h2 className={styles['create-text']}>
          Create Scholarship Work
        </h2>
        <div className={styles['parent-container']}>
          <div className={styles['float-child']}>
            <div className={styles['form-container']}>
              <form onSubmit={handleSubmit} className={styles['create-form']}>
                <div className={styles['form-column']}>
                  <div class="item3" className={styles['container-form']}>
                    <label htmlFor="title">Semester</label>
                    <input
                      type="text"
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
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

                    <label htmlFor="hours">Limit number of Students </label>
                    <input
                      type="number"
                      id="limit"
                      name="limit"
                      value={formData.limit}
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

                    <label htmlFor="start">Start Date and Time of Work </label>
                    <input
                      type="datetime-local"
                      id="start"
                      name="start"
                      value={formData.start}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="end">End Date and Time of Work </label>
                    <input
                      type="datetime-local"
                      id="end"
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="hours">Scholarship Hours for Work </label>
                    <input
                      type="number"
                      id="hours"
                      name="hours"
                      value={formData.hours}
                      onChange={handleChange}
                      required
                    />

                    <div className={styles['form-button-container']}>
                      <input type="submit" value="Submit" />
                    </div>
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
