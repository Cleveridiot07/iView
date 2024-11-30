require("dotenv").config();
const nodemailer = require("nodemailer");
const Interview = require("../models/interview.model");
const HR = require("../models/hr.model")

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});

// Create Interview
const createInterview = async (req, res) => {
  try {
    const { intervieweeEmail, status, position, reportPDF, date, time } =
      req.body;

    // Ensure all required fields are provided
    if (!intervieweeEmail || !status || !date || !time) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newInterview = new Interview({
      intervieweeEmail,
      interviewier: req.hr._id, // HR ID from authenticated user
      status,
      reportPDF,
      date,
      time,
      position,
    });

    await newInterview.save();

    
    const InterviewHRCompany = req.hr.companyName;
    console.log(InterviewHRCompany);

    // Send email to the interviewee
    const mailOptions = {
      from: process.env.Email_User,
      to: intervieweeEmail, 
      subject: "Your Scheduled Interview on IView",
      text:
        `Dear ${intervieweeEmail},\n\n` +
        `We are pleased to inform you that your interview has been successfully scheduled. Please find the details below:\n\n` +
        `Company: ${InterviewHRCompany}\n` + 
        `Date: ${date}\n` +
        `Time: ${time}\n` +
        `Platform: IView\n\n` +
        `To ensure a smooth interview process, we recommend joining 5–10 minutes before the scheduled time. Please make sure to have a stable internet connection. If you are not currently registered on IView, kindly register before the interview to be able to join the meeting.\n\n` +
        `Should you have any questions or require assistance, do not hesitate to reply to this email.\n\n` +
        `We wish you the best of luck with your interview!\n\n` +
        `Best regards,\n` +
        `Team IView`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Sending email with the following content:", mailOptions);

    console.log(`Email sent successfully to ${intervieweeEmail}`);

    res.status(201).json(newInterview);
  } catch (err) {
    console.error("Error creating interview:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Interview
const editInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { intervieweeEmail, status, position, reportPDF, date, time } =
      req.body;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    interview.intervieweeEmail = intervieweeEmail || interview.intervieweeEmail;
    interview.status = status || interview.status;
    interview.reportPDF = reportPDF || interview.reportPDF;
    interview.date = date || interview.date;
    interview.time = time || interview.time;
    interview.position = position || interview.position;

    await interview.save();
    res.status(200).json(interview);
  } catch (err) {
    console.error("Error editing interview:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Interview
const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await interview.remove();
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (err) {
    console.error("Error deleting interview:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Interviews by Interviewee Email
const getInterviewsByEmail = async (req, res) => {
  try {
    const { email } = req.user;
    const interviews = await Interview.find({
      intervieweeEmail: email,
    }).populate(
      "interviewier",
      "hrManager.email companyName profilePicture hrManager.name"
    );

    if (!interviews.length) {
      return res
        .status(404)
        .json({ message: "No interviews found for this email" });
    }

    res.status(200).json(interviews);
  } catch (err) {
    console.error("Error getting interviews by email:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Interviews by HR ID
const getInterviewsByHRId = async (req, res) => {
  try {
    const interviews = await Interview.find({ interviewier: req.hr._id });

    if (!interviews.length) {
      return res
        .status(404)
        .json({ message: "No interviews found for this HR" });
    }

    res.status(200).json(interviews);
  } catch (err) {
    console.error("Error getting interviews by HR ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Interview by Interview ID
const getInterviewByInterviewID = async (req, res) => {
  try {
    const { interviewID } = req.body; // Extract interviewID from the request body

    // Use findOne to fetch the interview by ID
    const interview = await Interview.findOne({ _id: interviewID });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // console.log("Interview fetched by ID:", interview);
    res.status(200).json(interview);
  } catch (error) {
    console.error("Error getting interview by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Start Interview
const startInterview = async (req, res) => {
  try {
    const { interviewId, meetingId } = req.body;

    // Ensure meeting ID is provided
    if (!meetingId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid meeting ID" });
    }

    // Find the interview by ID
    const interview = await Interview.findById(interviewId);

    // Check if the interview exists
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Ensure the HR is authorized to start the interview (matches HR ID)
    if (!interview.interviewier.equals(req.hr._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the interview with the meeting ID
    interview.meetingId = meetingId;
    interview.status = "Ongoing"; // Optional: Update status to 'Ongoing' or another relevant status

    // Save the updated interview
    await interview.save();

    // Send email to the interviewee about the interview start
    const joinLink = `http://localhost:5173/user/interview/room/?interviewID=${interviewId}`;
    const mailOptions = {
      from: process.env.Email_User,
      to: interview.intervieweeEmail,
      subject: "Your Interview Has Started on IView",
      text:
        `Dear ${interview.intervieweeEmail},\n\n` +
        `Your interview has now started. Please join the interview using the link below:\n\n` +
        `Join Link: ${joinLink}\n\n` +
        `For a smooth interview experience, we recommend joining promptly and ensuring a stable internet connection. If you encounter any issues, feel free to reply to this email.\n\n` +
        `We wish you the best of luck!\n\n` +
        `Best regards,\n` +
        `Team IView`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Sending email with the following content:", mailOptions);

    console.log(`Email sent successfully to ${interview.intervieweeEmail}`);

    res
      .status(200)
      .json({ message: "Interview started successfully", interview });
  } catch (err) {
    console.error("Error starting interview:", err);
    res.status(500).json({ message: "Server error" });
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
