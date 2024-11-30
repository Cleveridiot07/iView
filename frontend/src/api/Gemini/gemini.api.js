import axios from 'axios';

// Use Vite environment variables
const API_URL = import.meta.env.VITE_GEMINI_API_URL;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Function to generate the body of the post for Gemini API based on specified job role, company, and experience level.
 * @param {string} jobRole - The specific job role for the technical interview (e.g., 'SDE').
 * @param {string} companyName - The name of the company (e.g., 'Google').
 * @param {string} experienceLevel - The experience level (e.g., 'Fresher').
 * @returns {object} - The formatted request body for the Gemini API.
 */
export const generatePostBody = (jobRole, companyName, experienceLevel) => {
  return {
    contents: [
      {
        parts: [
          {
            text: `Generate sample data for technical interview questions and basic skills suggestions tailored to the following specifications:\n\n` +
                  `- **Job Role**: [${jobRole}]\n` +
                  `- **Company Name**: [${companyName}]\n` +
                  `- **Experience Level**: [${experienceLevel}]\n\n` +
                  `The questions should focus on relevant technical concepts, challenges, and problem-solving scenarios that align with the specified role. Provide the data in the following format:\n\n` +
                  `### Questions\n` +
                  `- Each question should include:\n` +
                  `  - **\`id\`**: A unique identifier.\n` +
                  `  - **\`number\`**: The sequence number of the question.\n` +
                  `  - **\`text\`**: A concise technical question relevant to the specified job role.\n` +
                  `  - **\`rating\`**: A numerical value (1-10) indicating the expected proficiency level.\n` +
                  `  - **\`remark\`**: A short evaluation or note about the expected response.\n` +
                  `  - **\`icon\`**: A Lucide icon that visually represents the question topic.\n\n` +
                  `### Basic Skills\n` +
                  `- Each skill should include:\n` +
                  `  - **\`id\`**: A unique identifier.\n` +
                  `  - **\`name\`**: The skill name, focusing on core competencies needed for the job role.\n` +
                  `  - **\`rating\`**: A numerical value (1-10) representing the desired level of proficiency.\n` +
                  `  - **\`icon\`**: A Lucide icon symbolizing the skill area.\n\n` +
                  `Ensure the generated data is suitable for a technical interview, reflecting the complexity and requirements associated with the given role and company.`
          }
        ]
      }
    ]
  };
};

/**
 * Function to fetch a response from the Gemini API using the provided job role, company name, and experience level.
 * @param {string} jobRole - The specific job role for the technical interview (e.g., 'SDE').
 * @param {string} companyName - The name of the company (e.g., 'Google').
 * @param {string} experienceLevel - The experience level (e.g., 'Fresher').
 * @returns {string} - The response from the Gemini API or an error message.
 */
export const fetchGeminiResponse = async (jobRole, companyName, experienceLevel) => {
  try {
    // Generate the body content using the provided parameters
    const bodyContent = generatePostBody(jobRole, companyName, experienceLevel);

    // Make the API call with the API key as a parameter
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`, // API endpoint with API key as 'id' parameter
      bodyContent, // JavaScript object data to be serialized by axios
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response from the API
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    // Log error message and throw a specific message
    console.error('Gemini API:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'An error occurred while fetching the response');
  }
};
