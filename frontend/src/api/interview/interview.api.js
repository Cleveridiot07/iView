// interview.api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interview'; // Update with your backend API URL

// Create an interview
export const createInterview = async (interviewData) => {
  const response = await axios.post(API_URL, interviewData, {
    withCredentials: true,
  });
  return response.data;
};

// Edit an interview
export const editInterview = async (id, interviewData) => {
  const response = await axios.put(`${API_URL}/${id}`, interviewData, {
    withCredentials: true,
  });
  return response.data;
};

// Delete an interview
export const deleteInterview = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Get interviews by interviewee email
export const getInterviewsByEmail = async () => {
  const response = await axios.get(`${API_URL}/email`, {
    withCredentials: true,
  });
  return response.data;
};

// Get interviews by HR ID
export const getInterviewsByHRId = async () => {
  const response = await axios.get(`${API_URL}/hr`, {
    withCredentials: true,
  });
  return response.data;
};

// Get interview by interview ID
export const getInterviewById = async (interviewId) => {
  try {
    const response = await axios.post(
      `${API_URL}/meeting`,  // API URL for your POST endpoint
      {
        interviewID: interviewId,  // Send the interview ID in the JSON body
        Test: "test",               // Optional additional data
      },
      {
        headers: {
          'Content-Type': 'application/json', 
        },
        withCredentials: true, 
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching interview by ID:", error);
    throw error;  // Rethrow error if necessary
  }
};


export const startInterview = async({interviewID,meetingID})=>{
    try {
      const response = await axios.post(
        `${API_URL}/startinterview`,
        {
          interviewID,
          meetingID
        },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
          withCredentials: true, 
        }
        
      );
      return response.data; 
    } catch (error) {
      console.error("Error Starting Interview", error);
      throw error;  
    }
}





