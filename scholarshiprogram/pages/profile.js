import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import ProfileNavbar from '@/components/profileNavbar';
import styles from '../components/home.module.css'
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";


// Inside your component
// ...

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const [selectedAppliedList, setSelectedAppliedList] = useState(true); // Set this to true by default
  const [selectedHistory, setSelectedHistory] = useState(false);

  const [works, setWorks] = useState([
    {
      id: 1,
      appliedList: 'Applied List',
      history: 'History',
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
      <div className={styles['home-page']}>
        <div className={styles['profileSection']}>
          <div className={styles['profilePictureContainer']}>
            <Image src="/profile_pic.png" className={styles['profilePicture']} alt="Profile Picture" width={100} height={100} />
          </div>
          <div className={styles['profileContent']}>
            <div>Sasha the Great</div>
            <div>1701202</div>
          </div>
        </div>
        <div className={styles['detailSection']}>
          <div className={styles['topDetail']}>
            <div className={styles['hourContent']}>
              Scholarship work hours 1/2023   
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
                <p className={styles['content-text']}>{works[0].appliedList}</p>
              </div>
            ) : (
              <div className={styles['details-info']}>
                <p className={styles['content-text']}>{works[0].history}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}