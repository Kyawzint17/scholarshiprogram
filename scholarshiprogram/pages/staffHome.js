import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link component from Next.js
import StaffNavbar from '/components/staffNavbar';
import StudentModal from '@/components/ModalStudent';
import DeleteModal from '../components/DeleteModal'; // Import your DeleteModal component
import { useSession } from 'next-auth/react';
import Modal from '../components/modal-rejectdisplay';

export default function Home() {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedStudentApplied, setSelectedStudentApplied] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { data, status } = useSession();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [progressStudents, setProgressStudents] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/scholarshipWork", { cache: "no-store" });
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
    
    if (selectedWork.studentList.filter(student => student.status === 'Accepted' || student.status === 'Completed' || student.status === 'Incompleted').length >= selectedWork.limit) {
      console.error("Cannot accept more students. Limit reached.");
      alert("Cannot accept more students. Limit reached.");
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

    if (rejectedStudent.status === 'Accepted') {
      console.error("Student is already accepted");
      alert("Student is already accepted");
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
    if (studentToComplete.status === 'Incompleted') {
      console.error("Student is already marked as Incompleted");
      alert("Student is already marked as Incompleted");
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
    
    if (acceptedStudent.status === 'Completed') {
      console.error("Student is already completed");
      alert("Student is already completed");
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

  const userEmail = data?.user?.email;

// Filter works by the organizer's email address
const filteredWorks = works ? works.filter(work => work.organizer === userEmail) : [];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month; // Add leading zero if needed
  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day; // Add leading zero if needed
  return `${year}-${month}-${day}`;
};

const formatdate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};


const filteredWorkS = works
  ? works
      .filter((work) => {
        if (selectedStatus === 'all') {
          return work.organizer === userEmail;
        }
        return work.workStatus === selectedStatus && work.organizer === userEmail;
      })
      .sort((a, b) => {
        const startDateA = new Date(a.start);
        const startDateB = new Date(b.start);
        const endDateA = new Date(a.end);
        const endDateB = new Date(b.end);

        // Compare start dates
        if (startDateA > startDateB) return -1;
        if (startDateA < startDateB) return 1;

        // If start dates are equal, compare end dates
        if (endDateA > endDateB) return -1;
        if (endDateA < endDateB) return 1;

        return 0;
      })
  : [];


// Use filteredWorks instead of works in your JSX rendering

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  
  const filteredWorksByFilters = works
  .filter((work) => {
    const matchesSemester = !semesterFilter || work.semester === semesterFilter;
    return matchesSemester;
  })
  .filter((work) => {
    const matchesLocation = !locationFilter || (work.location && work.location.toLowerCase() === locationFilter.toLowerCase());
    return matchesLocation;
  })
  .filter((work) => {
    const matchesStartDate = !startDateFilter || formatDate(work.start) === startDateFilter;
    return matchesStartDate;
  })
  .filter((work) => {
    const matchesEndDate = !endDateFilter || formatDate(work.end) === endDateFilter;
    return matchesEndDate;
  })
  .filter((work) => work.organizer === userEmail)
  .sort((a, b) => {
    const startDateA = new Date(a.start);
    const startDateB = new Date(b.start);
    const endDateA = new Date(a.end);
    const endDateB = new Date(b.end);

    // Compare start dates
    if (startDateA > startDateB) return -1;
    if (startDateA < startDateB) return 1;

    // If start dates are equal, compare end dates
    if (endDateA > endDateB) return -1;
    if (endDateA < endDateB) return 1;

    return 0;
  });

  const toggleFilterBox = () => {
    setFilterOpen((prevOpen) => !prevOpen);
  };

  const handleSemesterFilterChange = (e) => {
    setSemesterFilter(e.target.value);
  };

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleStartDateFilterChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateFilterChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const openStudentModal= () => {
    setStudentModalOpen(true);
  };

  const closeStudentModal= () => {
    setStudentModalOpen(false);
  };

  

  const handleViewButtonClick = (event, work) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
  
    // Open the reject modal here
    setIsRejectModalOpen(true);
    setRejectMessage(work.rejectMessage); // Assuming rejectMessage is a property of the work object
  };
  

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
  };

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
        <div className={styles['filter-container']}>
          <button onClick={toggleFilterBox} className={styles['filter-button1']}>
            Filter
          </button>
          {/* Filter Box */}
          {filterOpen && (
            <div className={styles['filter-box']}>
              {/* Design your filter box here */}
              <input
                type="text"
                placeholder="Enter semester"
                value={semesterFilter}
                onChange={handleSemesterFilterChange}
                className={styles['filter-input']}
              />
              <input
                type="text"
                placeholder="Enter location"
                value={locationFilter}
                onChange={handleLocationFilterChange}
                className={styles['filter-input']}
              />
              <div>Start Date</div>
              <input
                type="date"
                placeholder="Start date"
                value={startDateFilter}
                onChange={handleStartDateFilterChange}
                className={styles['filter-input']}
              />
              <div>End Date</div>
              <input
                type="date"
                placeholder="End date"
                value={endDateFilter}
                onChange={handleEndDateFilterChange}
                className={styles['filter-input']}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className={styles['home-page']}>
        <div className={styles['works-list']}>
        {filteredWorksByFilters.length === 0 ? (
          <div className={styles['no-works-message']}>---------- Work not available ----------</div>
        ) : (
        filteredWorksByFilters.map((work) => (
            <div
              key={work._id}
              onClick={() => handleWorkClick(work._id)}
              className={styles['work-item']}
              tabIndex="1"
            >
              <img
                src={work.picture}
                alt={`Image for ${work.title}`}
                style={{ width: '100px', height: 'auto', borderRadius: '10px' }}
              />
              <div className={styles['work-details']}>
                <div className={styles['ROterm-box']}>
                  <h3>Term {work.semester}</h3>
                </div>
                <div className={styles['work-title']}>{work.title}</div>
                <div>Place: {work.location}</div>
                <div className={styles['ROterm-box2']}>
                    <h3>Date and Time</h3>
                    <div className={styles['work-scholarhour']}>Start: {formatdate(work.start)} End : {formatdate(work.end)}</div>
                    <h4 className={styles['work-scholarhour']}>{work.hours} Given Hours | <Image src="/people.png" alt="Image" width={30} height={30} style={{ verticalAlign: "middle"}}/> {work.studentList.filter(student => student.status === 'Accepted' || student.status === 'Completed' || student.status === 'Incompleted').length} / {work.limit}</h4>
                </div>
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
                  <img src={selectedWork.picture}/>
              </div>
              <h2>Term {selectedWork.semester} </h2>
              <div className={styles['work-scholarship']}>
                <h3 className={styles['work-title']}>{selectedWork.title}</h3>
                <p>Location: {selectedWork.location}</p>
              </div>
              <div className={styles['details-info']}>
                <h3>Date & Time Schedule</h3>
                <ul>
                    <div>
                    {formatdate(selectedWork.start)} to {formatdate(selectedWork.end)}
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
                              <div>{student.studentName} ( {student.studentEmail} )</div>
                              <div>{student.status}</div>
                            </div>
                          ))} 
                      </div>

                      <div className={styles['action-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Accepted'  || student.status === 'Completed' || student.status === 'Incompleted') // Filter out students with status 'pending'
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
                          .filter((student) => student.status === 'Applied' || student.status === 'Accepted')
                          .map((student) => (
                            <div key={student.id} className={styles['student-entry']}>
                              <div>{student.studentName} ({student.studentEmail})</div>
                              <div>{student.status}</div>
                            </div>
                          ))}
                      </div>

                      <div className={styles['action-section']}>
                        {selectedWork.studentList
                          .filter((student) => student.status === 'Applied' || student.status === 'Accepted')
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
                    {filteredWorkS.length === 0 ? (
                    <div className={styles['filter-message']}>No works with the status {selectedStatus} yet.</div>
                    ) : (
                    filteredWorkS.map((work, index) => (
                        <div key={index} className={styles['work-entry']} onClick={() => handleWorkClick(work._id)}>
                        <div className={styles['work-image']}>
                            <img src={work.picture} alt={`Work ${index + 1}`} />
                        </div>
                        <div className={styles['work-details']}>
                          <div className={styles['ROterm-box1']}>
                            <h3>Term {work.semester}</h3>
                          </div>
                          <div className={styles['work-scholarship']}>
                          <div className={styles['work-title']}>{work.title}</div>
                          <div>Place: {work.location} |  Start date: {formatdate(work.start)} | End date: {formatdate(work.end)}  | {work.hours} Given Hours</div>
                          </div>
                        </div>
                        <div className={styles['work-status']}>
                            {work.workStatus === 'Rejected' && (
                                  <button className={styles['view-button']} onClick={(event) => handleViewButtonClick(event, work)}>
                                    View
                                  </button>
                                )}
                            <div>{work.workStatus}</div>
                        </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
          )}
        </div>
        <Modal isOpen={isRejectModalOpen} onClose={handleCloseRejectModal} rejectMessage={rejectMessage} />
      </div>
    </>
  );
}
