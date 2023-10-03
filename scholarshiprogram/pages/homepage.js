import Link from 'next/link';
import styles from '../components/home.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import CreateForm from '../components/Creatework';


export default function Home() {

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const works = [
    { id: 1, title: 'Work 1', details: 'Details of Work 1' },
    { id: 2, title: 'Work 2', details: 'Details of Work 2' },
  ];

  const handleWorkClick = (workId) => {
    const selectedWork = works.find((work) => work.id === workId);
    setSelectedWork(selectedWork);
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
              <div key={work.id} onClick={() => handleWorkClick(work.id)}>
                {work.title}
              </div>
            ))}
          </div>
        </div>
        <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.details}</p>
            </>
          ) : (
            <p>There are Works</p>
          )}
          <button className={styles['create-button']} onClick={toggleCreateForm}>
            Create
          </button>
          {isCreateFormVisible && <CreateForm />}
        </div>
      </div>
    </>

  );
}