import WorkModel from '@/models/work'; // adapt the path to your WorkModel

export default async function addStudent(req, res) {
  const { id, studentName, status } = req.query;

  console.log('id:', id);
  console.log('studentName:', studentName);
  console.log('status:', status);

  try {
    // Find the specific Work document by its ID
    const work = await WorkModel.findById(id);

    if (!work) {
      throw new Error('Work not found');
    }

    // Check if the user has already applied to the work
    const hasApplied = work.studentList.some(
      (student) => student.studentName === studentName
    );

    const rejectedStudentIndex = work.studentList.findIndex(
      (student) => student.status === 'Rejected'
    );

    if (rejectedStudentIndex !== -1) {
      work.studentList.splice(rejectedStudentIndex, 1);
    }
    
    if (hasApplied) {
      console.log('User has already applied to this work');
      res.status(409).json({ message: 'User has already applied to this work' });
      return;
    }

    if (work.studentList.length >= work.limit) {
      console.log('Applicant list for this work is full');
      res.status(409).json({ message: 'Applicant list for this work is full' });
      return;
    }
    
    // Update the studentList array
    work.studentList.push({ studentName, status });

    // Save the updated Work document
    await work.save();

    console.log('Student added to work successfully');

    res.status(200).json({ message: 'Student added to work successfully' });
  } catch (error) {
    console.error('Error adding student to work:', error);
    res.status(500).json({ message: 'Failed to add student to work' });
  }
}