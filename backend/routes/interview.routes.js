const express = require('express');
const router = express.Router();
const hrAuth = require('../middlewares/hrAuth.middleware');
const userAuth = require('../middlewares/userAuth.middleware');
const {
  createInterview,
  editInterview,
  deleteInterview,
  getInterviewsByEmail,
  getInterviewsByHRId,
  getInterviewByInterviewID,
  startInterview
} = require('../controllers/interview.controller');

// Create Interview
router.post('/', hrAuth, createInterview);

// Edit Interview
router.put('/:id', hrAuth, editInterview);

// Delete Interview
router.delete('/:id', hrAuth, deleteInterview);

// Get Interviews by Interviewee Email
router.get('/email', userAuth, getInterviewsByEmail);

// Get Interviews by HR ID
router.get('/hr', hrAuth, getInterviewsByHRId);

// Get Interview by Interview ID
router.post('/meeting',getInterviewByInterviewID);

// Start Interview by HR
router.post('/startinterview',hrAuth,startInterview);

module.exports = router;
