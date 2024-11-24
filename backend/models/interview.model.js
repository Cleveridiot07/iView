const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  intervieweeEmail: {
    type: String,
    required: true
  }, 
  interviewier: {
    type: Schema.Types.ObjectId,
    ref: 'HR',
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Missed', 'Upcoming','Ongoing'],
    required: true
  },
  position: {
    type: String,
    required: true,
  },
  reportPDF: {
    type: String  
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  meetingId: {
    type: String,
    default: null  
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
