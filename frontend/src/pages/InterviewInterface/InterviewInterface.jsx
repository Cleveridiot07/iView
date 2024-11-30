import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import VideoCallComponent from "../../components/VideoCall/video-sdk/VideoCallComponent";
import { PencilLine, Code, FileCheck2, X } from "lucide-react";
import SampleReportWeb from "../../components/ReportGenerator/SampleReportWeb";
import StreamVideoCall from "../../components/VideoCall/Stream";
import WhiteboardContainer from "../../components/Whiteboard/WhiteboardContainer";
import ChatFloatButton from "../../components/ChatFloatButton/ChatFloatButton";

const InterviewInterface = ({ room }) => {
  const location = useLocation();
  const [ReportGenertorOpen, setReportGenertorOpen] = useState(false);
  const [toggle, setToggle] = useState(true);

  // Check if 'hr' is in the URL
  const isHrView = location.pathname.includes('hr');

  const handleOpenWhiteBoard = () => {
    setToggle(false);
  };

  const handleOpenCodeEditor = () => {
    setToggle(true);
  };

  const handleOpenReportGenerator = () => {
    setReportGenertorOpen(!ReportGenertorOpen);
  };

  return (
    <div className="grid md:grid-cols-[3.0fr_1.5fr] grid-cols-1 md:grid-rows-[auto_1fr] grid-rows-[1fr_auto] max-w-screen max-h-screen h-screen w-screen md:overflow-hidden overflow-y-auto bg-[#121212] text-gray-200">
      {/* Code Editor Section */}
      <div className="bg-[#1e1e1e] flex justify-center items-center p-6 shadow-lg md:h-full h-screen overflow-y-auto row-span-1 md:row-auto md:order-none order-2">
        <div className="h-full w-full max-h-full max-w-full rounded-lg overflow-auto shadow-md">
          <div className="bg-[#272727f3] z-40 sticky top-0 px-6 pt-2 flex w-full justify-end">
            <label
              htmlFor="Toggle3"
              className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-100"
            >
              <input id="Toggle3" type="checkbox" className="hidden peer" />
              <span
                onClick={handleOpenCodeEditor}
                className="px-4 py-2 rounded-l-md bg-[#212121] peer-checked:bg-[#2e2e2e]"
              >
                <Code />
              </span>
              <span
                onClick={handleOpenWhiteBoard}
                className="px-4 py-2 rounded-r-md bg-[#2e2e2e] peer-checked:bg-[#212121]"
              >
                <PencilLine />
              </span>
            </label>
          </div>
          <div className="min-h-screen">
            {toggle ? (
              <CodeEditor />
            ) : (
                <WhiteboardContainer/>
            )}
          </div>
        </div>
      </div>
      
      {/* Video Call Section for Small Screens (first) */}
      <div className="bg-[#1e1e1e] flex justify-center items-center p-6 md:h-full h-screen  overflow-y-auto row-span-1  md:row-auto md:col-span-1 md:order-none order-1">
        <div className="h-full w-full max-h-full max-w-full rounded-lg overflow-auto shadow-md flex items-center justify-center p-4 bg-[#2a2a2a]">
          <VideoCallComponent />
          {/* <StreamVideoCall/> */}
        </div>
      </div>

      {/* Show Report Generator Button only if 'hr' is in the URL */}
      {isHrView && (
        <div
          onClick={handleOpenReportGenerator}
          className={`fixed cursor-pointer text-white rounded-lg top-5 z-50 p-3 right-5 ${
            ReportGenertorOpen ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {ReportGenertorOpen ? <X /> : <FileCheck2 />}
        </div>
      )}
      
      {/* Render the Report Generator if it's open */}
      {ReportGenertorOpen && (
        <div className="w-screen bg-black bg-opacity-65 fixed z-40 overflow-auto">
          <div className="max-w-4xl">
            <SampleReportWeb />
          </div>
        </div>
      )}
      <ChatFloatButton/>
    </div>
  );
};

export default InterviewInterface;
