import axios from 'axios';
const API_URL = `http://localhost:5000/api/users`;


export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return "Unauthorized";
  }
};




// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data.message || 'User registered successfully';
  } catch (error) {
    // Log error message and throw specific message
    console.error('Error registering user:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};


// Function to log in a user
export const loginUser = async (loginData) => {
  console.log(loginData);
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      loginData, 
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};





export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/edit`, userData, {
      withCredentials: true // This includes credentials in the request
    });
    return response.data;
  } catch (error) {
    console.error('Error editing user details:', error);
    throw error;
  }
};
