import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link component from Next.js
import StaffNavbar from '/components/staffNavbar';
import DeleteModal from '../components/DeleteModal'; // Import your DeleteModal component

export default function Home() {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedStudentApplied, setSelectedStudentApplied] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('');

  const [appliedStudents, setAppliedStudents] = useState([]);
  const [progressStudents, setProgressStudents] = useState([]);

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
  
  const acceptStudent = async (id) => {
    console.log("acceptStudent function called with student ID:", id);
    console.log("Selected work:", selectedWork);
  
    if (!selectedWork) {
      console.error("Work not found");
      alert("Work not found");
      return;
    }
  
    // Find the student in the studentList array within the selectedWork
    const acceptedStudent = selectedWork.studentList.find((student) => student._id.toString() === id);
  
    if (!acceptedStudent) {
      console.error("Student not found");
      alert("Student not found");
      return;
    }
  
    // Update the status of the accepted student to 'Accepted'
    const updatedStudentList = selectedWork.studentList.map((student) =>
      student._id.toString() === id ? { ...student, status: 'Accepted' } : student
    );
  
    // Update the selectedWork state with the updated studentList
    setSelectedWork((prevSelectedWork) => ({
      ...prevSelectedWork,
      studentList: updatedStudentList,
    }));
  
    // Send a PUT request to the server to update the student status
    try {
      const response = await fetch(`/api/scholarshipWork/${selectedWork._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentList: updatedStudentList,
        }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        console.error(message);
        alert(message);
      } else {
        console.log('Student status updated on the server');
        alert('Student has been accepted');
      }
    } catch (error) {
      console.error('Failed to update student status on the server:', error);
      alert('Failed to update student status on the server');
    }
  };
  
  

  const declineStudent = async (id) => {
    console.log("acceptStudent function called with student ID:", id);
    console.log("Selected work:", selectedWork);
  
    if (!selectedWork) {
      console.error("Work not found");
      alert("Work not found");
      return;
    }
  
    // Find the student in the studentList array within the selectedWork
    const rejectedStudent = selectedWork.studentList.find((student) => student._id.toString() === id);
  
    if (!rejectedStudent) {
      console.error("Student not found");
      alert("Student not found");
      return;
    }
  
    // Update the status of the accepted student to 'Accepted'
    const updatedStudentList = selectedWork.studentList.map((student) =>
      student._id.toString() === id ? { ...student, status: 'Rejected' } : student
    );
  
    // Update the selectedWork state with the updated studentList
    setSelectedWork((prevSelectedWork) => ({
      ...prevSelectedWork,
      studentList: updatedStudentList,
    }));
  
    // Send a PUT request to the server to update the student status
    try {
      const response = await fetch(`/api/scholarshipWork/${selectedWork._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentList: updatedStudentList,
        }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        console.error(message);
        alert(message);
      } else {
        console.log('Student status updated on the server');
        alert('Student has been declined');
      }
    } catch (error) {
      console.error('Failed to update student status on the server:', error);
      alert('Failed to update student status on the server');
    }
  };

  const completeStudent = async (id) => {
    console.log("completeStudent function called with student ID:", id);
    console.log("Selected work:", selectedWork);
  
    if (!selectedWork) {
      console.error("Work not found");
      alert("Work not found");
      return;
    }
  
    // Find the student in the studentList array within the selectedWork
    const studentToComplete = selectedWork.studentList.find((student) => student._id.toString() === id);
  
    if (!studentToComplete) {
      console.error("Student not found");
      alert("Student not found");
      return;
    }
  
    // Update the status of the student to 'Completed'
    const updatedStudentList = selectedWork.studentList.map((student) =>
      student._id.toString() === id ? { ...student, status: 'Completed' } : student
    );
  
    // Update the selectedWork state with the updated studentList
    setSelectedWork((prevSelectedWork) => ({
      ...prevSelectedWork,
      studentList: updatedStudentList,
    }));
  
    // Send a PUT request to the server to update the student status
    try {
      const response = await fetch(`/api/scholarshipWork/${selectedWork._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentList: updatedStudentList,
        }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        console.error(message);
        alert(message);
      } else {
        console.log('Student status updated on the server');
        alert('Student has completed the work');
      }
    } catch (error) {
      console.error('Failed to update student status on the server:', error);
      alert('Failed to update student status on the server');
    }
  };

  const incompleteStudent = async (id) => {
    console.log("acceptStudent function called with student ID:", id);
    console.log("Selected work:", selectedWork);
  
    if (!selectedWork) {
      console.error("Work not found");
      alert("Work not found");
      return;
    }
  
    // Find the student in the studentList array within the selectedWork
    const acceptedStudent = selectedWork.studentList.find((student) => student._id.toString() === id);
  
    if (!acceptedStudent) {
      console.error("Student not found");
      alert("Student not found");
      return;
    }
  
    // Update the status of the accepted student to 'Accepted'
    const updatedStudentList = selectedWork.studentList.map((student) =>
      student._id.toString() === id ? { ...student, status: 'Incompleted' } : student
    );
  
    // Update the selectedWork state with the updated studentList
    setSelectedWork((prevSelectedWork) => ({
      ...prevSelectedWork,
      studentList: updatedStudentList,
    }));
  
    // Send a PUT request to the server to update the student status
    try {
      const response = await fetch(`/api/scholarshipWork/${selectedWork._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentList: updatedStudentList,
        }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        console.error(message);
        alert(message);
      } else {
        console.log('Student status updated on the server');
        alert('Student has incompleted the work');
      }
    } catch (error) {
      console.error('Failed to update student status on the server:', error);
      alert('Failed to update student status on the server');
    }
  };

   // Pass [] as the second argument to run the effect only once on mount

  const handleWorkClick = (workId) => {
    setSelectedWork(works.find((work) => work._id === workId));
  };

  const filteredWorks = works ? works.filter(work => {
    if (selectedStatus === 'all') {
      return true;
    }
    return work.workStatus === selectedStatus;
  }) : [];

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  
  const handleSemesterFilterChange = (e) => {
    setSemesterFilter(e.target.value);
  };

  const filteredWorksBySemester = semesterFilter
    ? works.filter(work => work.semester === semesterFilter)
    : works;

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(`/api/delete/${selectedWork._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete work');
      }
  
      const updatedWorks = works.filter((work) => work._id !== selectedWork._id);
      setWorks(updatedWorks);
      setSelectedWork(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting work:', error);
      // Handle error as needed (e.g., show an error message)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StaffNavbar />
      <div className={styles.line} />
      <div className={styles['work-header']}>
        <h1 className={styles['textwork']}>WORK</h1>
        {/* Semester Filter Input */}
        <input
          type="text"
          placeholder="Enter semester (e.g., 2/2023)"
          value={semesterFilter}
          onChange={handleSemesterFilterChange}
          className={styles['semester-filter-input']}
        />
      </div>
      
      <div className={styles['home-page']}>
        <div className={styles['works-list']}>
        {filteredWorksBySemester.length === 0 ? (
          <div className={styles['no-works-message']}>---------- Work not available ----------</div>
        ) : (
        filteredWorksBySemester.map((work) => (
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
                style={{ borderRadius: '10px' }} // Add any additional styling here
              />

              <div className={styles['work-details']}>
                <div className={styles['work-title']}>{work.title}</div>
                <div>Term {work.semester}</div>
              </div>
            </div>
          )))}
        </div>
        <div className={styles['vertical-line']}></div>
        <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              <div className={styles['button-container']}>
                <button className={styles['close-button']} onClick={() => setSelectedWork(null)}>Close</button>
              </div>

              <div className={styles['work-image']}>
                  <Image src={selectedWork.picture} width={100} height={50}/>
              </div>
              <h2>{selectedWork.title}</h2>
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
                    <h3>Limit No of Student: {selectedWork.limit}</h3>
                </div>
              </div>     
              <div className={styles['button-container']}>
              <button className={styles['delete-button']} onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
                <DeleteModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  onDelete={handleDeleteConfirmed}
                />
                
              </div>
              <div className={styles['contact-section']}>
                <div className={styles['title-container']}>
                  <h3
                    className={!selectedContact && !selectedStudentApplied ? styles['active-title'] : ''}
                    onClick={() => {
                      setSelectedContact(null);
                      setSelectedStudentApplied(false);
                    }}
                  >
                    Details
                  </h3>

                  <h3
                    className={selectedStudentApplied ? styles['active-title'] : ''}
                    onClick={() => {
                      setSelectedContact(false);
                      setSelectedStudentApplied(true);
                    }}
                  >
                    Student Applied
                  </h3>
                  <h3
                    className={selectedContact ? styles['active-title'] : ''}
                    onClick={() => {
                      setSelectedContact(true);
                      setSelectedStudentApplied(false);
                    }}
                  >
                    Student Progress
                  </h3>
                </div>
                {selectedContact ? (
                    <div className={styles['list-info']}>
                      <div>Name</div>
                      <div>Status</div>
                      <div>Action</div>
                      <div className={styles['name-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Accepted' || student.status === 'Completed' || student.status === 'Incompleted') // Filter out students with status 'pending'
                          .map((student) => (
                            <div key={student.id} className={styles['student-entry']}>
                              <div>{student.studentName}</div>
                              <div>{student.status}</div>
                            </div>
                          ))} 
                      </div>

                      <div className={styles['action-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Accepted'  ) // Filter out students with status 'pending'
                          .map((student) => ( 
                          <div key={student.id} className={styles['button-entry']}>
                            <div className={styles['button-group']}>
                              <button className={styles['accept-button']} onClick={() => completeStudent(student._id)}>
                                Complete
                              </button>
                              <button className={styles['reject-button']} onClick={() => incompleteStudent(student._id)}>
                                Incomplete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : selectedStudentApplied ? (
                    <div className={styles['list-info']}>
                      <div>Name</div>
                      <div>Status</div>
                      <div>Response</div>
                  
                      <div className={styles['name-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Applied' || student.status === 'Accepted') // Filter out students with status 'pending'
                          .map((student) => (
                            <div key={student.id} className={styles['student-entry']}>
                              <div>{student.studentName}</div>
                              <div>{student.status}</div>
                            </div>
                          ))}
                      </div>
                  
                      <div className={styles['action-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Applied') // Filter out students with status 'pending'
                          .map((student) => (
                            <div key={student.id} className={styles['button-entry']}>
                              <div className={styles['button-group']}>
                              <button className={styles['accept-button']} onClick={() => {
                                console.log("Accept button clicked for student with ID:", student._id);
                                acceptStudent(student._id);
                              }}>
                                Accept
                              </button>
                                <button className={styles['reject-button']} onClick={() => declineStudent(student._id)}>
                                  Decline
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                <div className={styles['details-info']}>
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
                  )}
            </div>
          </>
          ) : (
            <div className={`${styles['no-works-message-s']} ${selectedWork ? styles['hidden'] : ''}`}>
                <div className={styles['approve-title']}>Approval Status List</div>
                <div className={`${styles['details-info']}`}>
                    <div className={styles['status-buttons']}>
                    <button onClick={() => handleStatusClick('all')}>All</button>         
                    <button onClick={() => handleStatusClick('Pending')}>Pending</button>
                    <button onClick={() => handleStatusClick('Accepted')}>Accepted</button>
                    <button onClick={() => handleStatusClick('Rejected')}>Rejected</button>
                    </div>
                    {filteredWorks.length === 0 ? (
                    <div className={styles['filter-message']}>No works with the status "{selectedStatus}" yet.</div>
                    ) : (
                    filteredWorks.map((work, index) => (
                        <div key={index} className={styles['work-entry']} onClick={() => handleWorkClick(work._id)}>
                        <div className={styles['work-image']}>
                            <Image src={work.picture} alt={`Work ${index + 1}`} width={100} height={50} />
                        </div>
                        <div className={styles['work-title']}>
                            <div>{work.title}</div>
                            <div>{work.hours} Hours</div>
                        </div>
                        <div className={styles['work-status']}>
                            <div>{work.workStatus}</div>
                        </div>
                        </div>
                    ))
                    )}
                </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
}
