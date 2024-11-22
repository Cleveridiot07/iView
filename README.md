

# AI-Powered Interview Collaboration Platform

This repository contains both the frontend and backend code for an AI-powered interview collaboration platform. The platform facilitates seamless collaboration between HR managers and candidates, enabling scheduling, real-time video interviews, collaborative tools, and AI-powered report generation.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## Features
- **User Management**: Separate workflows for interviewees and HR managers.
- **Real-Time Collaboration**: Integrated video conferencing and collaborative tools for interviews.
- **AI-Generated Reports**: Generate customized interview reports using AI.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase for OTP-based phone authentication, JWT
- **AI Integration**: Prebuilt parameters with customizable options for report generation
- **File Storage**: Cloudinary for profile images, Firebase for resumes
- **Real-Time Tools**: Agora SDK for video conferencing

---

## Installation


### Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (local or cloud instance)
- **Firebase Configuration** (add `.env` file)
- **Cloudinary Configuration** (add credentials to `.env`)

### Clone the Repository
```bash
git clone https://github.com/Cleveridiot07/iView
cd iView
```

### Install Dependencies
```bash
npm install
```

---

## Usage

### Run the Application
To run both the backend and frontend concurrently:
```bash
npm run dev
```

### Access the Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000](http://localhost:8000)

---

## Project Structure
```plaintext
.
├── backend/           # Backend API and server logic
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── controllers/   # Request handling logic
│   ├── utils/         # Utility functions (e.g., Cloudinary, Firebase)
│   └── server.js      # Entry point for the backend
├── frontend/          # React frontend code
│   ├── src/           # Main source folder
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page-specific components
│   │   ├── utils/      # Helper functions (e.g., API integration)
│   │   └── App.js      # Main application entry
│   └── vite.config.js # Vite configuration
├── package.json       # Project metadata and scripts
└── README.md          # Project documentation
```

---

## Scripts
- **`npm run dev`**: Run both the frontend and backend concurrently.
- **`npm run server`**: Start the backend server.
- **`npm run client`**: Start the frontend development server.

---

## Contributing
We welcome contributions to enhance the platform! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any inquiries or feedback, please contact [your-email@example.com].
```

### Notes:
1. Replace `your-repo-name` with the actual repository name.
2. Update contact information, repository link, and any other placeholders.
3. Include the actual `.env` variables required in the "Installation" section, if necessary.
