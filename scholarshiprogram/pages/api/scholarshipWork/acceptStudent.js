import dbConnect from '@/lib/db';
import WorkModel from '@/models/Work'; // adapt the path to your WorkModel

export default async function acceptStudent(req, res) {
    const { id } = req.query;
    const { status } = req.body;
  
    console.log('id:', id);
    console.log('status:', status);
  
    try {
      // Connect to the database
      await dbConnect();
  
      // Find the specific Work document by its ID
      const work = await WorkModel.findById(id);
  
      if (!work) {
        throw new Error('Work not found');
      }
  
      // Update the student status in the studentList array
      work.studentList = work.studentList.map((student) =>
        student._id.toString() === id ? { ...student, status } : student
      );
  
      // Save the updated Work document
      const updatedWork = await work.save();
  
      console.log('Student status updated in the database:', updatedWork);
  
      res.status(200).json({ message: 'Student status updated in the database' });
    } catch (error) {
      console.error('Error accepting student:', error.message);
  
      // If the error is "Work not found", send a 404 Not Found response
      if (error.message === 'Work not found') {
        res.status(404).json({ message: 'Work not found' });
        return;
      }
  
      // If the error is not "Work not found", send a 500 Internal Server Error response
      res.status(500).json({ message: 'Failed to accept student' });
    }
  }