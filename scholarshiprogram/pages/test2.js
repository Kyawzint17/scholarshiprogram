import React, { useState } from 'react';


const Students = () => {
  const [progressStudents, setProgressStudents] = useState([]);
  const [historyStudents, setHistoryStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [appliedStudents, setAppliedStudents] = useState([
    { id: 1, name: 'Student 1', status: 'pending' },
    { id: 2, name: 'Student 2', status: 'pending' },
  ]);

  const timeSlots = [
    '9:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 17:00',
    '17:00 - 19:00',
  ];

  const acceptStudent = (id) => {
    const updatedStudents = appliedStudents.map((student) =>
      student.id === id ? { ...student, status: 'accepted' } : student
    );
    setAppliedStudents(updatedStudents);
    setProgressStudents([...progressStudents, { id, name: 'New Student', status: 'accepted', timeSlot: selectedTimeSlot }]);
  };

  const declineStudent = (id) => {
    const updatedStudents = appliedStudents.filter((student) => student.id !== id);
    setAppliedStudents(updatedStudents);
  };

  const completeStudent = (id) => {
    const updatedStudents = progressStudents.map((student) =>
      student.id === id ? { ...student, status: 'complete' } : student
    );
    setProgressStudents(updatedStudents);
    setHistoryStudents([...historyStudents, { id, name: 'New Student', status: 'complete', timeSlot: selectedTimeSlot }]);
  };

  const incompleteStudent = (id) => {
    const updatedStudents = progressStudents.map((student) =>
      student.id === id ? { ...student, status: 'incomplete' } : student
    );
    setProgressStudents(updatedStudents);
    setHistoryStudents([...historyStudents, { id, name: 'New Student', status: 'incomplete', timeSlot: selectedTimeSlot }]);
  };

  const openModal = (student) => {
    setModalIsOpen(true);
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleApply = () => {
    if (selectedTimeSlot) {
      acceptStudent(selectedStudent.id);
      closeModal();
    }
  };

  return (
    <div>
      <h2>Student Applied</h2>
      <ul>
        {appliedStudents.map((student) => (
          <li key={student.id}>
            {student.name} - {student.status}
            <button onClick={() => acceptStudent(student.id)}>Accept</button>
            <button onClick={() => declineStudent(student.id)}>Decline</button>
          </li>
        ))}
      </ul>

      <h2>Student Progress</h2>
      <ul>
        {progressStudents.map((student) => (
          <li key={student.id}>
            {student.name} - {student.status} - {student.timeSlot}
            <button onClick={() => completeStudent(student.id)}>Complete</button>
            <button onClick={() => incompleteStudent(student.id)}>Incomplete</button>
          </li>
        ))}
     </ul>

        <h2>Student History</h2>
        <ul>
        {historyStudents.map((student) => (
            <li key={student.id}>
            {student.name} - {student.status}
            </li>
        ))}
        </ul>
        </div>
    );
};

    export default Students;