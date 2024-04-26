import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  semester: String,
  picture: String,
  title: String,
  start: Date,
  end: Date,
  hours: Number,
  location: String,
  limit: Number,
  details: String,
  qualification: String,
  contacts: String,
  studentList: [{
    studentName: String,
    studentEmail: String,
    status: String,
  }],
  workStatus: String,
  organizerN: String,
  organizer: String,
  rejectMessage: String,
});

// Specify the collection name as 'work'
const WorkModel = mongoose.models.Work || mongoose.model('Work', workSchema, 'work');

export default WorkModel;
