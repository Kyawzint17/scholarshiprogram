import Link from 'next/link';
import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import CreateForm from '../components/Creatework';


export default function Home() {

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);

  const works = [
    {
      id: 1,
      image: '/workpost.png',
      title: 'Work 1',
      description: 'Work 1 Description',
      details: 'Work plays a crucial role in the lives of individuals and societies, serving as a means of livelihood, personal fulfillment, and societal progress. In the modern context, work encompasses a wide range of activities and professions, from traditional manual labor to intricate knowledge-based tasks. The nature of work has evolved with advancements in technology and changes in societal values, leading to diverse career paths and flexible work arrangements. While work provides financial stability, it also contributes to personal growth, skill development, and a sense of accomplishment. The balance between work and personal life has become increasingly important, as organizations and individuals strive to foster well-being and productivity. In this dynamic landscape, fostering a positive work environment, promoting work-life balance, and embracing continuous learning have emerged as key factors in shaping the modern work experience.',
      qualification: [
        { info: 'Qualificaton 1 info' },
      ],
      contacts: [
        { info: 'Contact 1 information'  },
      ],
    },
    {
      id: 2,
      image: '/workpost.png',
      title: 'Work 2',
      description: 'Work 2 Description',
      details: 'Work 2 Detail',
      qualification: [
        { info: 'Qualificaton 2 info' },
      ],
      contacts: [
        { info: 'Contact 2 information' },
      ],
    },
  ];

  const handleWorkClick = (workId) => {
    const selectedWork = works.find((work) => work.id === workId);
    setSelectedWork(selectedWork);
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
                  Apply 
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
                      setSelectedQualification(false);
                    }}
                  >
                    Details
                  </h3>
                </div>

                {selectedContact ? (
                  <div className={styles['details-info']}>
                    <p>{selectedWork.details}</p>
                  </div>
                ) : (
                  <div className={styles['details-info']}>
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
    
  );
}
