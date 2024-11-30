require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});

const sendTestEmail = async () => {
  const mailOptions = {
    from: process.env.Email_User,
    to: 'recipient@example.com', // Change this to the actual recipient
    subject: "Test Email from Node.js",
    text: "Hello, this is a test email sent from Node.js using Nodemailer",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully:`, info.response);
  } catch (error) {
    console.error(`Error occurred:`, error);
  }
};

// Call the function to send the email
sendTestEmail();