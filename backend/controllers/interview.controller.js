const Interview = require('../models/interview.model');

// Create Interview
const createInterview = async (req, res) => {
  try {
    const { intervieweeEmail, status, position, reportPDF, date, time } = req.body;

    // Ensure all required fields are provided
    if (!intervieweeEmail || !status || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newInterview = new Interview({
      intervieweeEmail,
      interviewier: req.hr._id, // HR ID from authenticated user
      status,
      reportPDF,
      date,
      time,
      position
    });

    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (err) {
    console.error('Error creating interview:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit Interview
const editInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { intervieweeEmail, status,position, reportPDF, date, time } = req.body;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    interview.intervieweeEmail = intervieweeEmail || interview.intervieweeEmail;
    interview.status = status || interview.status;
    interview.reportPDF = reportPDF || interview.reportPDF;
    interview.date = date || interview.date;
    interview.time = time || interview.time;
    interview.position = position || interview.position,

    await interview.save();
    res.status(200).json(interview);
  } catch (err) {
    console.error('Error editing interview:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Interview
const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await interview.remove();
    res.status(200).json({ message: 'Interview deleted successfully' });
  } catch (err) {
    console.error('Error deleting interview:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Interviews by Interviewee Email
const getInterviewsByEmail = async (req, res) => {
  try {
    const { email } = req.user;
    const interviews = await Interview.find({ intervieweeEmail: email })
    .populate('interviewier', 'hrManager.email companyName profilePicture hrManager.name') 
    if (!interviews.length) {
      return res.status(404).json({ message: 'No interviews found for this email' });
    }

    res.status(200).json(interviews);
  } catch (err) {
    console.error('Error getting interviews by email:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Interviews by HR ID
const getInterviewsByHRId = async (req, res) => {
  // console.log(req.data);
  try {
    const interviews = await Interview.find({ interviewier: req.hr._id });

    if (!interviews.length) {
      return res.status(404).json({ message: 'No interviews found for this HR' });
    }

    res.status(200).json(interviews);
  } catch (err) {
    console.error('Error getting interviews by HR ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getInterviewByInterviewID = async (req, res) => {

  try {
    const { interviewID } = req.body;  // Extract interviewID from the request body

    // Use findOne to fetch the interview by ID
    const interview = await Interview.findOne({ _id: interviewID });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    console.log('Interview fetched by ID:', interview);
    res.status(200).json(interview);
  } catch (error) {
    console.error('Error getting interview by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Start Interview
const startInterview = async (req, res) => {
  try {
    const { interviewId, meetingId } = req.body;
    console.log(interviewId);
    // console.log("TEST",interviewId);

    // // Validate the ObjectId
    // if (!mongoose.Types.ObjectId.isValid(interviewId)) {
    //   return res.status(400).json({ message: 'Invalid interview ID' });
    // }

    // Ensure meeting ID is provided
    if (!meetingId) {
      return res.status(400).json({ message: 'Please provide a valid meeting ID' });
    }

    // Find the interview by ID
    const interview = await Interview.findById(interviewId);

    // Check if the interview exists
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Ensure the HR is authorized to start the interview (matches HR ID)
    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the interview with the meeting ID
    interview.meetingId = meetingId;
    interview.status = 'Ongoing';  // Optional: Update status to 'In Progress' or any other status

    // Save the updated interview
    await interview.save();

    res.status(200).json({ message: 'Interview started successfully', interview });
  } catch (err) {
    console.error('Error starting interview:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createInterview,
  editInterview,
  deleteInterview,
  getInterviewsByEmail,
  getInterviewsByHRId,
  getInterviewByInterviewID,
  startInterview,
};
