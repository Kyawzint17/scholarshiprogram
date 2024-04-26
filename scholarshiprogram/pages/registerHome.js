import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import RegisterNavbar from '/components/registerNavbar';
import styles from '../components/home.module.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Modal from '../components/modal-reject';
import Modal1 from '../components/modal-rejectdisplay';

export default function Register() {
  const [works, setWorks] = useState([]);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [isRejectModalOpen1, setIsRejectModalOpen1] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [semesterFilter, setSemesterFilter] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [organizerFilter, setOrganizerFilter] = useState('');

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

  const filteredWorks = works
  ? works
      .filter((work) => {
        if (selectedStatus === 'all') {
          return true;
        }
        return work.workStatus === selectedStatus;
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


  
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

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
  
  const filteredWorksByFilters = works
  .filter((work) => {
    const matchesOrganizer = !organizerFilter || (work.organizerN && work.organizerN.toLowerCase() === organizerFilter.toLowerCase());
    return matchesOrganizer;                     
  })
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

  const handleViewButtonClick = (event, work) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
  
    // Open the reject modal here
    setIsRejectModalOpen1(true);
    setRejectMessage(work.rejectMessage); // Assuming rejectMessage is a property of the work object
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen1(false);
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

  return (
    <>
      <RegisterNavbar />
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
                placeholder="Enter Organizer Name"
                value={organizerFilter}
                onChange={(e) => setOrganizerFilter(e.target.value)}
                className={styles['filter-input']}
              />
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
        filteredWorksByFilters.map((work) => ( // Change works to filteredWorks
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
                <div>by <span className={styles['textstyle']}>{work.organizerN}</span></div>
                <div>
                    <div className={styles['ROterm-box2']}>
                    <div className={styles['work-scholarhour']}>Start: {formatdate(work.start)} End: {formatdate(work.end)}</div>
                    </div> 
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
                    {filteredWorksByFilters.length === 0 ? (
                    <div className={styles['filter-message']}>No works with the status {selectedStatus} yet.</div>
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
                          <div>Place: {work.location} |  Start date: {formatdate(work.start)} | End date: {formatdate(work.end)}  | {work.hours} Given Hours</div>
                          <div>Created by <span className={styles['textstyle']}>{work.organizerN}</span></div>
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
        <Modal1 isOpen={isRejectModalOpen1} onClose={handleCloseRejectModal} rejectMessage={rejectMessage} />
      </div>

    </>
  )
}
