import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import ProfileNavbar from '@/components/profileNavbar';
import styles from '../components/home.module.css'
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
import CircularProgressCard from '@/components/CircleProgress';

// Inside your component
// ...

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const [selectedAppliedList, setSelectedAppliedList] = useState(true); // Set this to true by default
  const [selectedHistory, setSelectedHistory] = useState(false);

  const [works, setWorks] = useState([
    {
      id: 1,
      image: '/workpost.png',
      title: 'Work 1',
      hours: '60 hours',
      appliedList: [
        { status: 'Accepted', icon: '/applied.png' },
        { status: 'Pending', icon: '/not_applied.png' },
        { status: 'Rejected', icon: '/not_applied.png' },
        // Add more work entries with images and status
      ],
      history: [
        { status: 'Completed', icon: '/completed.png' },
        { status: 'In Progress', icon: '/in_progress.png' },
        { status: 'Imcompleted', icon: '/not_applied.png' },
        // Add more work entries with images and status
      ],
      
    },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ProfileNavbar />
      <div className={styles.line} />
      <h1 className={styles['textProfile']}>
        PROFILE
      </h1>
      <div className={styles['home-page']}>
        <div className={styles['profileSection']}>
          <div className={styles['profilePictureContainer']}>
            <Image src="/profile_pic.png" className={styles['profilePicture']} alt="Profile Picture" width={100} height={100} />
          </div>
          <div className={styles['profileContent']}>
            <div>Anwar Rasheed</div>
            <div>6228105</div>
            <div className={styles['infoBox']}>
              <div className={styles['infoTitle']}>Faculty</div>
            </div>
            <div className={styles['infoBox']}>
              <div className={styles['infoTitle']}>Email</div>
            </div>
          </div>
        </div>
        <div className={styles['detailSection']}>
          <div className={styles['topDetail']}>
            <div className={styles['hourContent']}>
              Scholarship work hours 1/2023   
            </div>
            <div>
              <CircularProgressCard value={value} />
            </div>
          </div>
          <div className={styles['bottomDetail']}>
            <div className={styles['title-container']}>
              <h3
                className={selectedAppliedList ? styles['active-title'] : ''}
                onClick={() => {
                  setSelectedAppliedList(true);
                  setSelectedHistory(false);
                }}
              >
                Applied List
              </h3>
              <h3
                className={!selectedAppliedList ? styles['active-title'] : ''}
                onClick={() => {
                  setSelectedAppliedList(false);
                  setSelectedHistory(true);
                }}
              >
                History
              </h3>
            </div>
            {selectedAppliedList ? (
              <div className={styles['qualification-info']}>
                {works[0].appliedList.map((entry, index) => (
                  <div key={index} className={styles['work-entry']}>
                    <div className={styles['work-image']}>
                      <img src={works[0].image} alt={`Work ${index + 1}`} />
                    </div>
                    <div className={styles['work-title']}>
                      <div>
                      {works[0].title}
                      </div>
                      <div>
                      {works[0].hours}
                      </div>
                    </div>
                    <div className={styles['work-status']}>
                      {entry.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles['details-info']}>
                {works[0].history.map((entry, index) => (
                  <div key={index} className={styles['work-entry']}>
                    <div className={styles['work-image']}>
                      <img src={works[0].image} alt={`Work ${index + 1}`} />
                    </div>
                    <div className={styles['work-title']}>
                      <div>
                      {works[0].title}
                      </div>
                      <div>
                      {works[0].hours}
                      </div>
                    </div>
                    <div className={styles['work-status']}>
                      {entry.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
