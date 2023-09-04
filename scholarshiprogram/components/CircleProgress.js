import styles from './home.module.css';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Chip, CircularProgress } from "@nextui-org/react";

const CircularProgressCard = ({ value }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((v) => (v >= value ? value : v + 1));
    }, 1000 / value);

    return () => clearInterval(interval);
  }, [value]);

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