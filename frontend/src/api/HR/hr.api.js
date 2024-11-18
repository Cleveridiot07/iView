import axios from 'axios';

const API_URL = `http://localhost:5000/api/hr`; // Update the URL as needed


// Function to fetch HR
export const fetchHR = async()=>{
  try {
    const response = await axios.get(`${API_URL}`,{
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    console.error("Error in Fetching HR");
    console.log(error);
    throw new Error(error.response?.data?.message || 'An error occured during fetching hr details');

  }
}

// Function to register a new HR
export const registerHR = async (hrData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, hrData, {
      // Adjust headers or config as needed
    });
    return response.data.message || 'HR registered successfully';
  } catch (error) {
    // Log error message and throw specific message
    console.error('Error registering HR:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

// Function to log in an HR
export const loginHR = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true // Important for sending cookies
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in HR:', error);
    throw error;
  }
};

// Function to edit HR details
export const editHR = async (hrData, token) => {
  try {
    const response = await axios.put(`${API_URL}/edit`, hrData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing HR details:', error);
    throw error;
  }
};
