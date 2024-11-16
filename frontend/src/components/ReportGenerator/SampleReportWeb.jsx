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

  const [skills, setSkills] = useState(initialSkills);
  const [isEditing, setIsEditing] = useState(true);

  const handleSaveSkills = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  return (
    <div>
      <CustomProfileSection />
      
      <CustomBasicSkiils
        skillsList={skills}
        isEditing={isEditing}
        onSaveSkills={handleSaveSkills}
      />
      
      <CustomQuestions />
      <CustomFeedBack />
      <CustomFooter />

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
