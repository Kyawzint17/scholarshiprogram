import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import RegisterNavbar from '@/components/registerNavbar';
import styles from '../components/home.module.css';

export default function Register() {

    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedWork, setSelectedWork] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);

    const [works, setWorks] = useState([
      {
        id: 1,
        image: '/workpost.png',
        title: 'Work 1',
        description: 'Work 1 Description',
        details: 'Work 1 Detail',
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

    const handleCloseClick = () => {
      setSelectedWork(null); // Reset selectedWork when the Close button is clicked
      setCreateFormVisible(false); // Hide create form if it's open
  };

    const handleDelete = (workId) => {
      const updatedWorks = works.filter(work => work.id !== workId);
      setWorks(updatedWorks);
      setSelectedWork(null);
  };

    const toggleCreateForm = () => {
      setCreateFormVisible((prevVisible) => !prevVisible);
  };

    return (
    <>
    <RegisterNavbar />
      
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
                <button className={styles['accept-button']} onClick={toggleCreateForm}>
                  Accept
                </button>
                <button className={styles['reject-button']} onClick={() => handleDelete(selectedWork.id)}>
                  Reject
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
                    className={!selectedContact}
                    onClick={() => {
                      setSelectedContact(null);
                      setSelectedStudentApplied(false);
                    }}
                  >
                    Details
                  </h3>
                </div>

                {selectedContact ? (
                  <div className={styles['first-info']}>
                    <p>{selectedWork.details}</p>
                  </div>
                ) : (
                  <div className={styles['first-info']}>
                    <p>{selectedWork.details}</p>
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
    )
  }