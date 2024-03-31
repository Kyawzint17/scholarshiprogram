import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import RegisterNavbar from '/components/registerNavbar';
import styles from '../components/home.module.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Modal from '../components/modal-reject';

export default function Register() {
  const [works, setWorks] = useState([]);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
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
  ? works
      .filter((work) => work.semester === semesterFilter)
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
  : works.sort((a, b) => {
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


  const handleCloseClick = () => {
    setSelectedWork(null); // Reset selectedWork when the Close button is clicked
    setCreateFormVisible(false); // Hide create form if it's open
  };

  const toggleCreateForm = () => {
    setCreateFormVisible((prevVisible) => !prevVisible);
  };


  const openRejectModal = () => {
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Assume you have an API endpoint for updating work status
  const updateWorkStatus = async (workId, newStatus, rejectMessage) => {
    try {
      const res = await fetch(`/api/scholarshipWork/${workId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          workStatus: newStatus,
          rejectMessage: rejectMessage || "",
         }),
      });
      if (!res.ok) {
        throw new Error('Failed to update work status');
      }
    } catch (error) {
      console.error('Error updating work status:', error);
      // Handle error
    }
  };

  const handleAccept = () => {
    if (selectedWork.workStatus === 'Rejected') {
      console.error('Cannot accept a work with "Rejected" status');
      alert('Cannot accept a work with "Rejected" status');
      return;
    }

    updateWorkStatus(selectedWork._id, 'Accepted')
      .then(() => {
        // Update local state only after successful response from the API
        const updatedWorks = works.map((work) =>
          work._id === selectedWork._id ? { ...work, workStatus: 'Accepted' } : work
        );
        setWorks(updatedWorks);
        alert('Work Approved Success');
      })
      .catch((error) => {
        console.error('Error accepting work:', error);

        // Handle error
      });
  };

  const handleReject = (rejectMessage) => {
    if (selectedWork.workStatus === 'Accepted') {
      console.error('Cannot reject a work with "Accepted" status');
      alert('Cannot reject a work with "Accepted" status');
      return;
    }

    console.log('Reject Message:', rejectMessage);
  
    updateWorkStatus(selectedWork._id, 'Rejected', rejectMessage)
      .then(() => {
        // Update local state only after successful response from the API
        const updatedWorks = works.map((work) =>
          work._id === selectedWork._id ? { 
            ...work, 
            workStatus: 'Rejected',
          rejectMessage: rejectMessage || '',  
        } 
        : work
        );
        setWorks(updatedWorks);
        alert('Work Rejected Success');
        closeRejectModal();
      })
      .catch((error) => {
        console.error('Error rejecting work:', error);
        // Handle error
      });
  };

  return (
    <>
      <RegisterNavbar />

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
        filteredWorksBySemester.map((work) => ( // Change works to filteredWorks
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
                <div className={styles['work-scholarship']}>
                    <h3>Start date</h3>
                    <div className={styles['work-scholarhour']}>{work.start}</div>
                    <h4 className={styles['work-scholarhour']}>{work.hours} Given Hours</h4>
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
                <button className={styles['accept-button']} onClick={handleAccept}>
                  Accept
                </button>
                <button className={styles['reject-button']} onClick={openRejectModal}>
                  Reject
                </button>

                <Modal
                  isOpen={isRejectModalOpen}
                  onClose={closeRejectModal}
                  onConfirm={(rejectMessage) => handleReject(rejectMessage)}
                />

                <button className={styles['close-button']} onClick={handleCloseClick}>
                  Close
                </button>
              </div>

              <div className={styles['work-image']}>
                  <img src={selectedWork.picture}/>
              </div>
              <h2>{selectedWork.title}</h2>
              <p>Limit No of Student: {selectedWork.limit}</p>
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
              <div className={styles['contact-section']}>
                <div className={styles['title-container']}>
                  <h3
                    className={!selectedContact}
                    onClick={() => {
                      setSelectedContact(null);
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
                            <img src={work.picture} alt={`Work ${index + 1}`} />
                        </div>
                        <div className={styles['work-details']}>
                          <div className={styles['ROterm-box1']}>
                            <h3>Term {work.semester}</h3>
                          </div>
                          <div className={styles['work-scholarship']}>
                          <div className={styles['work-title']}>{work.title}</div>
                          <div>Place: {work.location} |  Start date: {work.start}</div>
                          </div>
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
  )
}
