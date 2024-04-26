import React, { useState } from 'react';
import styles from '../styles/Create.module.css';
import CreateNavBar from '/components/RcreateNavbar';
import { set } from 'mongoose';
import { useSession } from 'next-auth/react';

export default function Create() {
  const url = "http://localhost:3000/api/posts/scholarshipWork";
  const { data, status } = useSession();
  
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
    organizerN: "",
    organizer: "",
    rejectMessage: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!data?.user) {
      console.error("User not logged in");
      return;
    }
    
    const userName = data.user.name;
    const userEmail = data.user.email;
    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);
    let semester;

    // Check if start and end dates are valid
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();
    
      // Determine semester based on the month of the start and end dates
      if ((startMonth >= 10 && startMonth <= 11) || (endMonth >= 0 && endMonth <= 4)) {
        // November to May
        const year = startMonth >= 10 ? startDate.getFullYear() : startDate.getFullYear() - 1;
        semester = `2/${year}`;
    } else if ((startMonth >= 5 && startMonth <= 9) || (endMonth >= 5 && endMonth <= 9)) {
        // June to October
        semester = `1/${startDate.getFullYear()}`;
    }     
    } else {
      // Invalid date format
      console.error("Invalid date format");
      return;
    }
    

    const updatedFormData = {
      ...formData,
      semester: semester,
      organizerN: userName,
      organizer: userEmail,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(updatedFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      alert("Work created successfully");
      console.log(responseData);
    } catch (error) {
      console.error("Error creating work", error);
      alert("Error creating work");
    }
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
        <h2 class="item1" className={styles['create-text']}>
          Create Scholarship Work
        </h2>
        <div className={styles['parent-container']}>
          <div className={styles['float-child']}>
            <div className={styles['form-container']}>
              <form onSubmit={handleSubmit} className={styles['create-form']}>
                <div className={styles['float-child-left']}>
                  
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
                </div>

                <div className={styles['float-child-right']}>
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

                <div className={styles['flat-container']}>

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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
