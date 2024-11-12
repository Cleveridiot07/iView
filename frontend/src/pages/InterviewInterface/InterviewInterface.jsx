import React, { useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import VideoCall from "../../components/VideoCall/VideoCall";
import WhiteboardContainer from "../../components/Whiteboard/WhiteboardContainer";

const InterviewInterface = ({ room }) => {
  const [showCodeEditor, setShowCodeEditor] = useState(true);

  const toggleView = () => {
    setShowCodeEditor((prev) => !prev);
  };

  return (
    <div className="grid md:grid-cols-[3.0fr_2.0fr] grid-rows-[auto_1fr] max-w-screen max-h-screen h-screen w-screen md:overflow-hidden overflow-y-auto bg-[#121212] text-gray-200">
      
      {/* Code Editor and Toggle Button Section */}
      <div className="bg-[#1e1e1e] flex flex-col items-center p-8 shadow-lg h-full overflow-y-auto row-span-1 md:row-auto">
        
        {/* Toggle Button */}
        <div className="mb-4">
          <button
            onClick={toggleView}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {showCodeEditor ? "Switch to Whiteboard" : "Switch to Code Editor"}
          </button>
        </div>

        {/* Code Editor or Whiteboard */}
        <div className="h-full w-full max-h-full max-w-full rounded-lg overflow-auto shadow-md">
          {showCodeEditor ? <CodeEditor /> : <WhiteboardContainer />}
        </div>
      </div>

      {/* Video Call Section */}
      <div className="bg-[#1e1e1e] flex justify-center items-center p-6 shadow-lg h-full overflow-y-auto row-span-1 md:row-auto">
        <div className="h-full w-full max-h-full max-w-full rounded-lg overflow-auto shadow-md flex items-center justify-center p-4 bg-[#2a2a2a]">
          <VideoCall />
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;
