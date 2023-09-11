import styles from './home.module.css';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Chip, CircularProgress } from "@nextui-org/react";

const CircularProgressCard = () => {
  const [progressValue, setProgressValue] = useState(0);
  const progressLimit = 100; // Set your desired progress limit

  // Function to manually update progress with a limit
  const updateProgress = () => {
    if (progressValue < progressLimit) {
      const newValue = progressValue + 10;
      setProgressValue(newValue > progressLimit ? progressLimit : newValue);
    }
  };

  // Use a useEffect if you want to automatically update the progress
  useEffect(() => {
    const interval = setInterval(updateProgress, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={styles["circular-progress-card"]}>
      <CardBody className={styles["progress-container"]}>
        <CircularProgress
          classNames={{
            svg: styles["circular-progress"],
            indicator: styles["progress-indicator"],
            track: styles["progress-track"],
            value: styles["progress-value"],
          }}
          value={progressValue}
          strokeWidth={4}
          showValueLabel={false} // Disable the default value label
        />
        <div className={styles["chip-container"]}>
          <Chip
            classNames={{
              base: styles["chip"],
              content: styles["chip-content"],
            }}
            variant="bordered"
          >
            {progressValue} Working Hours
          </Chip>
        </div>
      </CardBody>
      <CardFooter className={styles["progress-container"]}></CardFooter>
    </Card>
  );
};

export default CircularProgressCard;