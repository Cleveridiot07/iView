import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getInterviewById } from "../../../../api/Interview/interview.api";

export default function JoinScreen({ getMeetingAndToken }) {
  const location = useLocation();
  const [meetingId, setMeetingId] = useState(null);
  const [interviewID, setInterviewID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHR, setIsHR] = useState(false);

  // Determine if the user is HR based on the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlInterviewId = searchParams.get("interviewID");
    setInterviewID(urlInterviewId);

    // Check if the URL contains "hr" or "user"
    if (location.pathname.includes("hr")) {
      setIsHR(true);
    } else if (location.pathname.includes("user")) {
      setIsHR(false);
    }
  }, [location.search, location.pathname]);

  // Fetch interview details if the interview ID is available
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      if (interviewID) {
        const interviewData = await getInterviewById(interviewID.trim());
        setMeetingId(interviewData.meetingId);
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchInterviewDetails();
  }, [interviewID]);

  const onClick = async () => {
    if (meetingId || isHR) {
      await getMeetingAndToken(meetingId);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-gray-700 font-bold">
          {isHR ? "HR Interview Management" : "Join Interview"}
        </h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl text-gray-700 font-semibold">
              Please wait while the interview details are being loaded...
            </h2>
          </div>
        ) : meetingId ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">Meeting ID:</p>
            <p className="text-xl font-bold text-gray-400 bg-gray-100 p-3 rounded-md">
              {meetingId}
            </p>
            {isHR ? (
              <button
                onClick={onClick}
                className="w-full py-2 mt-4 rounded-sm text-white bg-blue-500 hover:bg-blue-600"
              >
                Join Interview
              </button>
            ) : (
              <button
                onClick={onClick}
                className="w-full py-2 mt-4 rounded-sm text-white bg-green-500 hover:bg-green-600"
              >
                Join Interview
              </button>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl text-gray-700 font-semibold">
              {isHR
                ? "This interview has not started yet. Click the button below to start the interview."
                : "Your interview has not started yet. Please wait while your HR starts the interview."}
            </h2>
            {isHR && (
              <button
                onClick={onClick}
                className="w-full py-2 mt-4 rounded-sm text-white bg-green-500 hover:bg-green-600"
              >
                Start Interview
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
