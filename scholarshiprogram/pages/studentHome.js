import Link from 'next/link';
import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CreateForm from '../components/Creatework';
import NavBar from '@/components/Navbar';
import { useSession } from 'next-auth/react';





export default function Home() {

  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [hoursFilter, setHoursFilter] = useState('');
  const [isApplyModalVisible, setApplyModalVisible] = useState(false);
  const { data, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/posts/scholarshipWork", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setWorks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleWorkClick = (workId) => {
    setSelectedWork(works.find((work) => work._id === workId));
  };
  
  const url = "http://localhost:3000/api/posts/scholarshipWork";
  
  const applyWork = async () => {
    if (!data?.user) {
      console.error("User not logged in");
      return;
    }
  
    const studentName = `${data.user?.name}`; // assuming that data.user has a 'name' property
    const workId = selectedWork._id;
    const status = 'Applied';
  
    console.log('studentName:', studentName);
    console.log('status:', status);
    
    try {
      const res = await fetch(`/api/posts/addStudent?id=${workId}&studentName=${encodeURIComponent(studentName)}&status=${encodeURIComponent(status)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        console.error(message);
        if (message === 'User has already applied to this work') {
          alert('You have already applied to this work');
        } else if (message === "Applicant list for this work is full") {
          alert(message);
        }
      } else {
        res.json().then(data => {
          console.log('PUT request successful:', data);
          if (data.limitReached) {
            alert("Applicant list for this work is full");
          } else {
          alert('Work Applied Success');
          // You can update the UI or perform any necessary actions here based on the response data
          }
        });
      }
  
    } catch (error) {
      console.error('Failed to apply work:', error);
    }
  };
  
  const filteredWorks = works ? works.filter(work => {
    if (selectedStatus === 'all') {
      return true;
    }
    // Check if any student in the studentList array has the selectedStatus
    return work.studentList.some(student => student.status === selectedStatus);
  }) : [];
  

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleCloseClick = () => {
    setSelectedWork(null); // Reset selectedWork when the Close button is clicked
    setCreateFormVisible(false); // Hide create form if it's open
  };

  const handleHoursFilterChange = (e) => {
    setHoursFilter(e.target.value);
  };

  const filteredWorksByHours = works.filter(work => {
    if (!hoursFilter) {
      return work.workStatus === "Accepted"; // Filter only works with status "Accepted" if no hours filter is applied
    }
    return work.hours === parseInt(hoursFilter) && work.workStatus === "Accepted"; // Filter works by hours and status "Accepted"
  });

  const toggleCreateForm = () => {
    setCreateFormVisible((prevVisible) => !prevVisible);
  };


  return (
    <>
    <NavBar />
      <div className={styles.line} />
      <div className={styles['work-header']}>
        <h1 className={styles['textwork']}>APPROVED WORK</h1>
        {/* Semester Filter Input */}
        <input
          type="text"
          placeholder="Enter working hours (e.g 3/5/10)"
          value={hoursFilter}
          onChange={handleHoursFilterChange}
          className={styles['semester-filter-input']}
        />
      </div>
      <div className={styles['home-page']}>
        <div className={styles['works-list']}>
        {filteredWorksByHours.length === 0 ? (
            <div className={styles['no-works-message']}>Work with specified hours not available</div>
          ) : (
            filteredWorksByHours.map((work) => (
              <div
                key={work._id}
                onClick={() => handleWorkClick(work._id)}
                className={styles['work-item']}
                tabIndex="1"
              >
                <Image
                  src={work.picture}
                  alt={`Image for ${work.title}`}
                  width={100} // Specify the width directly
                  height={100} // Set height to 'auto' to maintain aspect ratio
                  style={{ borderRadius: '10px' }}
                />
                <div className={styles['work-details']}>
                  <div className={styles['work-title']}>{work.title}</div>
                  <div className={styles['work-scholarhour']}>{work.hours} Hours</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles['vertical-line']}></div>

        <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              
              <button className={styles['close-button']} onClick={handleCloseClick}>
                  Close
              </button>
              <div className={styles['work-image']}>
                <Image src={selectedWork.picture} width={100} height={50} />
              </div>
              <h2>Term {selectedWork.semester} </h2>
              <h3>{selectedWork.title}</h3>
              <p>Location: {selectedWork.location}</p>
              <div className={styles['details-info']}>
                <h3>Date & Time Schedule</h3>
                  <ul>
                      <div>
                        {selectedWork.start} to {selectedWork.end}
                        {selectedWork.hours && (
                          <span> | Scholarship Hours: {selectedWork.hours}</span>
                        )}
                      </div>
                  </ul>
              </div>
              
              
              <div className={styles['contact-section']}>
                <div className={styles['title-container']}>
                    <h3>Student Applicants: {selectedWork.studentList.filter(student => student.status === 'Applied' || student.status === 'Accepted' || student.status === 'Completed' || student.status === 'Incompleted').length} of {selectedWork.limit}</h3>
                </div>
                <div className={styles['details-info']}> 
                  <div>
                    <ol>
                      {selectedWork.studentList
                         // Filter out students with status 'Applied'
                        .map((student, index) => (
                          <li key={student.id} className={styles['student-entry']}>
                            {index + 1}. {student.studentName}  {student.status}
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
              


              <div className={styles['button-container']}>
              <button className={styles['apply-button']} onClick={applyWork}>
                Apply
              </button>
              </div>

              <div className={styles['contact-section']}>
                <div className={styles['title-container']}>
                  <h3
                    className={!selectedContact}
                    onClick={() => {
                      setSelectedContact(null);
                      setSelectedQualification(false);
                    }}
                  >
                    Details
                  </h3>
                </div>

                <div className={styles['details-info']}>
                  <h3>Description</h3>
                  <p>{selectedWork.details}</p>
                </div>

                <div className={styles['details-info']}>
                  <h3>Qualification</h3>
                  <p>{selectedWork.qualification}</p>
                </div>


                <div className={styles['details-info']}>
                  <h3>Contact</h3>
                  <p>{selectedWork.contacts}</p>
                </div>
              </div>

            </>
          ) : (
            <div className={`${styles['no-works-message-s']} ${selectedWork ? styles['hidden'] : ''}`}>
              <div className={styles['approve-title']}>Work Status</div>
              <div className={`${styles['details-info']}`}>
                <div className={styles['status-buttons']}>
                  <button onClick={() => handleStatusClick('all')}>All</button>
                  <button onClick={() => handleStatusClick('Applied')}>Applied</button>
                  <button onClick={() => handleStatusClick('Accepted')}>Accepted</button>
                  <button onClick={() => handleStatusClick('Rejected')}>Rejected</button>
                </div>
                {filteredWorks.length === 0 ? (
                  <div className={styles['filter-message']}>No works with the status "{selectedStatus}" yet.</div>
                ) : (
                  <div>
                    {filteredWorks
                      .filter((work) => work.workStatus === "Accepted")
                      .map((work) => (
                        <div key={work.id} className={styles['work-entry']} onClick={() => handleWorkClick(work._id)}>
                          <div className={styles['work-image']}>
                            <Image src={work.picture} alt={`Work ${work.id}`} width={100} height={50} />
                          </div>
                          <div className={styles['work-title']}>
                            <h3>{work.title}</h3>
                            <div className={styles['unbold']}>
                              <li>
                                {work.start} to {work.end}
                                {work.hours && (
                                  <span> | Scholarship Hours: {work.hours}</span>
                                )}
                              </li>
                            </div>
                            <div>
                              Location: {work.location}
                            </div>
                          </div>
                          <div className={styles['work-status']}>
                            <div>
                              {work.studentList.map((student, idx) => (
                                <div key={idx}>
                                  {student.studentName === data?.user?.name && ( // Check if the student name matches the current user's name
                                    <span>{student.status}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>

  );
}
