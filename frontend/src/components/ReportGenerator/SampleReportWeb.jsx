import React, { useState } from "react";
import CustomBasicSkiils from "./components/CustomBasicSkills";
import CustomProfileSection from "./components/CustomProfileSection";
import CustomQuestions from "./components/CustomQuestions";
import CustomFeedBack from "./components/CustomFeedBack";
import CustomFooter from "./components/CustomFooter";

const SampleReportWeb = () => {
  const initialSkills = [
    { id: "1", name: "Basic Technical Knowledge", rating: 8, icon: "Code" },
    { id: "2", name: "Problem-Solving Skills", rating: 7, icon: "Puzzle" },
    { id: "3", name: "Technical Learning Potential", rating: 9, icon: "Brain" },
    {
      id: "4",
      name: "Collaboration and Communication",
      rating: 8,
      icon: "Users",
    },
  ];

  const userData = {
    name: "Henry Beljiman",
    interviewDate: "2023-05-15",
    role: "Junior Developer",
    company: "Tech Corp",
    description: "Passionate about web development and new technologies.",
  };

  const questionList = [
    {
      id: "1",
      number: 1,
      text: "Explain RESTful API architecture",
      rating: 8,
      remark: "Good understanding of REST principles",
      icon: "Globe",
    },
    {
      id: "2",
      number: 2,
      text: "Describe the difference between SQL and NoSQL databases",
      rating: 7,
      remark: "Solid grasp on database types",
      icon: "Database",
    },
    {
      id: "3",
      number: 3,
      text: "What are the benefits of using containerization?",
      rating: 9,
      remark: "Excellent knowledge of Docker and containers",
      icon: "Cloud",
    },
  ];

  const sectionData = {
    strengths: [
      "Strong problem-solving abilities",
      "Excellent communication skills",
      "Deep knowledge of React ecosystem",
    ],
    weaknesses: [
      "Limited experience with backend technologies",
      "Need improvement in system design",
    ],
    improvements: [
      "Focus on learning Node.js and Express",
      "Practice more system design problems",
      "Contribute to open source projects",
    ],
  };

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, text: "Great performance!", sentiment: "positive" },
    {
      id: 2,
      text: "Needs improvement in time management.",
      sentiment: "negative",
    },
  ]);

  const [skills, setSkills] = useState(initialSkills);
  const [isEditing, setIsEditing] = useState(true);

  const handleSaveSkills = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  return (
    <div className="max-h-screen overflow-auto">
      <CustomProfileSection Editing={isEditing} userData={userData} />

      <CustomBasicSkiils
        skillsList={skills}
        isEditing={isEditing}
        onSaveSkills={handleSaveSkills}
      />

      <CustomQuestions isEditing={isEditing} questionList={questionList} />
      <CustomFeedBack isEditing={isEditing} sectionData={sectionData} />
      <CustomFooter
        feedbacksProp={feedbacks}
        isEditing={isEditing}
        onFeedbackChange={setFeedbacks}
        onAddFeedback={setFeedbacks}
      />

      <div className="mt-6 fixed bottom-5 right-5 text-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Disable Editing" : "Enable Editing"}
        </button>
      </div>
    </div>
  );
};

export default SampleReportWeb;
