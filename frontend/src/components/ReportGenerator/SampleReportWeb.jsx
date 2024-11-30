import React, { useEffect, useState } from "react";
import CustomBasicSkills from "./components/CustomBasicSkills";
import CustomProfileSection from "./components/CustomProfileSection";
import CustomQuestions from "./components/CustomQuestions";
import CustomFeedBack from "./components/CustomFeedBack";
import CustomFooter from "./components/CustomFooter";
import { fetchGeminiResponse } from "../../api/Gemini/gemini.api";
import GeminiLoader from "../GeminiLoader/GeminiLoader";
import extractJsonFromText from "../../utils/geminiTextParser"


const SampleReportWeb = () => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const fetchGemini = async () => {
      try {
        const data = await fetchGeminiResponse("SDE", "Google", "Fresher");
        // console.log("Raw API Data:", data);

        const parsedData = extractJsonFromText(data);
        // console.log("Parsed Data: ",parsedData);

        const questionsArray = parsedData[0] || [];
        const skillsArray = parsedData[1] || [];

        if(questionsArray.length > 0) console.log("Questions: ",questionsArray);
        if(skillsArray.length > 0) console.log("skills ",skillsArray);
  
        // if (Array.isArray(parsedData) && parsedData.length >= 2) {
        //   const questionsArray = parsedData[0] || [];
        //   const skillsArray = parsedData[1] || [];
  
        //   // const extractedSkills = skillsArray.map((skill) => ({
        //   //   id: skill.id,
        //   //   name: skill.name,
        //   //   rating: skill.rating,
        //   //   icon: skill.icon,
        //   // }));
  
        //   // const extractedQuestions = questionsArray.map((question) => ({
        //   //   id: question.id,
        //   //   number: question.number,
        //   //   text: question.text,
        //   //   rating: question.rating,
        //   //   remark: question.remark,
        //   //   icon: question.icon,
        //   // }));
  
        //   // setSkills(extractedSkills);
        //   // setQuestionList(extractedQuestions);
        // } else {
        //   console.error("Unexpected data format:");
        // }
  
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchGemini();
  }, [skills,questionList]);
  
  const userData = {
    name: "Henry Beljiman",
    interviewDate: "2023-05-15",
    role: "Junior Developer",
    company: "Tech Corp",
    description: "Passionate about web development and new technologies.",
  };

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

  const [isEditing, setIsEditing] = useState(true);

  const handleSaveSkills = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  if (loading) return <GeminiLoader />;

  return (
    <div className="max-h-screen overflow-auto">
      <CustomProfileSection Editing={isEditing} userData={userData} />

      <CustomBasicSkills
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
