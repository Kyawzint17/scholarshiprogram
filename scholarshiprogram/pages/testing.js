import { useState } from 'react';

const Students = () => {
  const [appliedStudents, setAppliedStudents] = useState([
    { id: 1, name: 'John Doe', status: 'pending' },
    { id: 2, name: 'Jane Smith', status: 'pending' },
  ]);

  const [progressStudents, setProgressStudents] = useState([
    { id: 3, name: 'Mark Johnson', status: 'incomplete' },
  ]);

  const acceptStudent = (id) => {
    const updatedStudents = appliedStudents.map((student) =>
      student.id === id ? { ...student, status: 'accepted' } : student
    );
    setAppliedStudents(updatedStudents);
    setProgressStudents([...progressStudents, { id, name: 'New Student', status: 'incomplete' }]);
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
  };

  const incompleteStudent = (id) => {
    const updatedStudents = progressStudents.map((student) =>
      student.id === id ? { ...student, status: 'incomplete' } : student
    );
    setProgressStudents(updatedStudents);
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
            {student.name} - {student.status}
            <button onClick={() => completeStudent(student.id)}>Complete</button>
            <button onClick={() => incompleteStudent(student.id)}>Incomplete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;