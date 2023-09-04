import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StaffNavbar from '@/components/staffNavbar';
import CreateForm from '../components/Creatework';
import Button from '../components/Button';
import Modal from '../components/Modal';


export default function Home() {

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedStudentApplied, setSelectedStudentApplied] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [works, setWorks] = useState([
    {
      id: 1,
      image: '/workpost.png',
      title: 'Work 1',
      description: 'Work 1 Description',
      details: 'Work 1 Detail',
      qualifications: 'Qualification information',
      contacts: 'Contact information',
      studentApplied: [
        { info: 'Student Applied 1' },
      ],
      studentProgress: [
        { info: 'Student Progress 1' },
      ],
    },
    {
      id: 2,
      image: '/workpost.png',
      title: 'Work 2',
      description: 'Work 2 Description',
      details: 'Work 2 Detail',
      qualifications: 'Qualification information',
      contacts: 'Contact information',
      studentApplied: [
        { info: 'Student Applied 2' },
      ],
      studentProgress: [
        { info: 'Student Progress 2' },
      ],
    },
  ]);
  

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

  const toggleCreateForm = () => {
    setCreateFormVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
        <StaffNavbar />
        <Button onClick={openModal} />
        <Modal isOpen={isModalOpen} onClose={closeModal} />
     
        <div className={styles.line} />
        <div className={styles['home-page']}>        
          <div className={styles['works-list']}>
          <div>
              {works.map((work) => (
              <div key={work.id} onClick={() => handleWorkClick(work.id) }className={styles['work-item']}>
                <img src= {work.image} 
                alt={`Image for ${work.title}`}
                style={{width: '100px', height: 'auto'}} 
                />
              <div className={styles['work-details']}>
                <div className={styles['work-title']}>{work.title}</div>
                <div className={styles['work-description']}>{work.description}</div>
              </div>
              </div>
            ))}
          </div>
          </div>
          <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              <div className={styles['button-container']}>
                <button className={styles['apply-button']} onClick={toggleCreateForm}>
                  Edit
                </button>
                <button className={styles['delete-button']} onClick={() => handleDelete(selectedWork.id)}>
                  Delete
                </button>
                <button className={styles['close-button']} onClick={handleCloseClick}>
                  Close
                </button>
              </div>

              <div className={styles['selected-image']}>
                <img src={selectedWork.image} alt={`Image for ${selectedWork.title}`} style={{width: '100px', height: 'auto'}} />
              </div>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.description}</p>

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
                  <div className={styles['first-info']}>
                    <p>{selectedWork.studentProgress[0].info}</p>
                  </div>
                ) : selectedStudentApplied ? (
                  <div className={styles['qualification-info']}>
                    {/* Qualification content goes here */}
                    <p>{selectedWork.studentApplied[0].info}</p>
                  </div>
                ) : (
                  <div className={styles['details-info']}>
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
            <div className={styles['no-works-message']}>
              <img
                src="/workposter.png"
                alt="No Works"
                className={styles['no-works-image']
                }
              />
              <h3>There are scholarship works</h3>
              <p>Select work for seeing more detail</p>
            </div>
          )}
          
          </div>
        </div>   
    </>
    
  );
}
