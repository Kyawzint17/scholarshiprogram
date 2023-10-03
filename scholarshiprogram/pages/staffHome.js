import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StaffNavbar from '/components/StaffNavbar';
import modal from '../components/Modal'

import StudentModal from '../components/ModalStudent';
import DeleteModal from '../components/DeleteModal'; // Import your DeleteModal component


import { columns, rows } from '../DB/data'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, user, avatar } from "@nextui-org/react";


const statusColorMap = {
  accpet: "Accepted",
  pending: "pending",
  reject: "rejected",
};

const studentData = {
  id: 1,
  name: 'John Doe',
  profile: 'Student Profile 1',
  username: 'johndoe123',
  email: 'johndoe@example.com',
};

export default function Home() {

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedStudentApplied, setSelectedStudentApplied] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete modal

  const [selectedStudent, setSelectedStudent] = useState(null); // Add this line to define the selectedStudent state

  const [isStudentModalOpen, setStudentModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const [works, setWorks] = useState([
    {
      id: 1,
      image: '/workpost.png',
      title: 'Work 1',
      description: 'Work 1 Description',
      hours: 'Work 1 Hours',
      dateTimes: [
        {
          startDate: '2023-10-01',
          startTime: '09:00 AM',
          endDate: '2023-10-01',
          endTime: '02:00 PM',
          scholarshipHours:'5 hours',
        },
        {
          startDate: '2023-10-02',
          startTime: '08:00 AM',
          endDate: '2023-10-02',
          endTime: '10:00 AM',
          scholarshipHours:'2 hours',
        },
      ],
      location: 'Work 1 Location',
      qualifications: 'Qualification information 1',
      contacts: 'Contact information 1',
      studentApplied: [
        { info: 'Anwar Rasheed' },
      ],
      studentProgress: [
        { info: 'Anwar Rasheed' },
      ],
    },
    {
      id: 2,
      image: '/workpost.png',
      title: 'Work 2',
      description: 'Work 2 Description',
      hours: 'Work 2 Hours',
      dateTimes: [
        {
          startDate: '2023-10-03',
          startTime: '09:00 AM',
          endDate: '2023-10-04',
          endTime: '02:00 PM',
          scholarshipHours:'5 hours',
        },
        {
          startDate: '2023-10-05',
          startTime: '08:00 AM',
          endDate: '2023-10-06',
          endTime: '10:00 AM',
          scholarshipHours: '2 hours',
        },
      ],
      location: 'Work 2 Location',
      qualifications: 'Qualification information 2',
      contacts: 'Contact information 2',
      studentApplied: [
        { info: 'Kyaw Zin Thein' },
      ],
      studentProgress: [
        { info: 'Kyaw Zin Thein' },
      ],
    },
  ]);

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setSelectedStudent(null);
    setStudentModalOpen(false);
  };


  const renderCell = React.useCallback((users, columnKey) => {
    const cellValue = users[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            description={user.email}
            name={cellValue}
          ></User>
        )
      case "status":
        return <div className={styles['work-description']}>{cellValue}</div>;
      case "hour":
        return <div className={styles['work-scholarhour']}>{cellValue}</div>;
      default:
        return cellValue;
    }
  }, []);



  const handleWorkClick = (workId) => {
    const selectedWork = works.find((work) => work.id === workId);
    setSelectedWork(selectedWork);
  };

  const handleDelete = (workId) => {
    const updatedWorks = works.filter(work => work.id !== workId);
    setWorks(updatedWorks);
    setSelectedWork(null);
  };

  const handleCloseClick = () => {
    setSelectedWork(null); // Reset selectedWork when the Close button is clicked
    setCreateFormVisible(false); // Hide create form if it's open
  };

  const handleDeleteConfirmed = () => {
    // Implement your deletion logic here
    // For example, you can remove the selectedWork or perform an API request
    console.log('Deleted item:', selectedWork);
    setIsDeleteModalOpen(false); // Close the delete modal after deletion
  };

  return (
    <>
      <StaffNavbar />
      <div className={styles.line} />
      <h1 className={styles['textwork']}>
        WORK
      </h1>
      <div className={styles['home-page']}>
        <div className={styles['works-list']}>
          <div>
            {works.map((work) => (
              <div key={work.id} onClick={() => handleWorkClick(work.id)} className={styles['work-item']} tabIndex="1">
                <img src={work.image}
                  alt={`Image for ${work.title}`}
                  style={{ width: '100px', height: 'auto', borderRadius: '10px' }}
                />
                <div className={styles['work-details']}>
                  <div className={styles['work-title']}>{work.title}</div>
                  <div>{work.hours}</div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles['vertical-line']}></div>
        <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              <div className={styles['button-container']}>
                
                <button className={styles['delete-button']} onClick={openDeleteModal}>
                  Delete
                </button>
                <DeleteModal
                  isOpen={isDeleteModalOpen}
                  onClose={closeDeleteModal} // Pass the correct function here
                  onDelete={handleDeleteConfirmed}
                />


                <button className={styles['close-button']} onClick={handleCloseClick}>
                  Close
                </button>
              </div>

              <div className={styles['selected-image']}>
                <img src={selectedWork.image} alt={`Image for ${selectedWork.title}`} style={{ width: '100px', height: 'auto', borderRadius: '10px' }} />
              </div>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.hours}</p>
              <p>{selectedWork.location}</p>

              <div className={styles['details-info']}>
                <h3>Date & Time Schedule</h3>
                <ul>
                  {selectedWork.dateTimes.map((dateTime, index) => (
                    <li key={index}>
                      {dateTime.startDate} - {dateTime.startTime} to {dateTime.endDate} - {dateTime.endTime}
                      {dateTime.scholarshipHours && (
                        <span> | Scholarship Hours: {dateTime.scholarshipHours}</span>
                      )}
                    </li>
                  ))}
                </ul>
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
                    <div>Attendance</div>
                    <div>Action</div>
                    <div className={styles['first-info']}>
                      <div className={styles['profile-box']}>
                        <div className={styles['profile-info']}>
                          <Image src="/profile_pic.png" className={styles['profilePicture']} alt="Profile Picture" width={50} height={50} />
                          <p
                            onClick={openStudentModal}
                            style={{ cursor: 'pointer', color: 'blue' }}
                          >
                            {selectedWork.studentProgress[0].info}
                          </p>
                          <StudentModal
                            isOpen={isStudentModalOpen}
                            onClose={closeStudentModal}
                            student={studentData}
                          />
                        </div>
                      </div>
                      <select className={styles['select-list']} name='name' id='name'>
                        <option>Present</option>
                        <option>Absent</option>
                      </select>


                      <button className={styles['confirm-button']}>Confirm</button>
                    </div>
                  </div>


                ) : selectedStudentApplied ? (
                  <div className={styles['list-info']}>
                    <div>Name</div>
                    <div>Response</div>
                    <div>Action</div>
                    <div className={styles['first-info']}>
                      <div className={styles['profile-box']}>
                        <div className={styles['profile-info']}>
                          <Image src="/profile_pic.png" className={styles['profilePicture']} alt="Profile Picture" width={50} height={50} />
                          <p
                            onClick={openStudentModal}
                            style={{ cursor: 'pointer', color: 'blue' }}
                          >
                            {selectedWork.studentProgress[0].info}
                          </p>
                          <StudentModal
                            isOpen={isStudentModalOpen}
                            onClose={closeStudentModal}
                            student={studentData}
                          />
                        </div>
                      </div>
                      <select className={styles['select-list']} name='name' id='name'>
                        <option>Accept</option>
                        <option>Reject</option>
                      </select>
                      <button className={styles['confirm-button']}>Confirm</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles['details-info']}>
                    <div className={styles['details-info']}>
                      <h3>Description</h3>
                      <p>{selectedWork.description}</p>
                    </div>

                    <div className={styles['details-info']}>
                      <h3>Qualification</h3>
                      <p>{selectedWork.qualifications}</p>
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
              <Table aria-label="Example table with dynamic content" className={styles["custom-table"]}>
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.key}
                      width={
                        column.key === "name"
                          ? "20%"
                          : column.key === "role"
                            ? "20%"
                            : "20%"
                      }
                      className={`${styles["table-column"]} ${styles["table-header"]}`} // Add a class for header styling
                    >
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={rows} className={styles["table-body"]}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell
                          width={
                            columnKey === "name"
                              ? "20%"
                              : columnKey === "role"
                                ? "20%"
                                : "20%"
                          }
                          className={styles["table-cell"]}
                        >
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>

  );
}