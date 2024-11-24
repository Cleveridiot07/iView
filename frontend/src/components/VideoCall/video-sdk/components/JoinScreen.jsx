import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getInterviewById } from "../../../../api/Interview/interview.api";

export default function JoinScreen({ getMeetingAndToken, userType = "user" }) {
  const location = useLocation();
  const [meetingId, setMeetingId] = useState(null);
  const [interviewID, setInterviewID] = useState(null);
  const [loading,setLoading] = useState(true);

  // Get the interview ID and meeting ID from the URL parameters if available
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // const urlMeetingId = searchParams.get("meetingID");
    const urlInterviewId = searchParams.get("interviewID");

    setInterviewID(urlInterviewId);

    // if (urlMeetingId) {
    //   setMeetingId(urlMeetingId); // Update meeting ID state if available
    // }
  }, [location.search]);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      if (interviewID) {
        const interviewData = await getInterviewById(interviewID.trim());
        setMeetingId(interviewData.meetingId);
        // console.log(interviewData.meetingId);
      }
    };

    fetchInterviewDetails();
  }, [interviewID]);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-gray-700 font-bold">
          {userType === "interviewee" ? "Join Interview" : "Start Interview"}
        </h2>
      </div>

      <div className="space-y-4">
        {meetingId ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">Meeting ID:</p>
            <p className="text-xl font-bold text-gray-400 bg-gray-100 p-3 rounded-md">
              {meetingId}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl text-gray-700 font-semibold">
              This interview has not started yet.
            </h2>
          </div>
        )}

        {userType === "interviewee" && !meetingId && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              onChange={(e) => setMeetingId(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        <button
          onClick={onClick}
          className={`w-full py-2 mt-4 rounded-sm text-white ${
            meetingId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-green-400 hover:bg-green-500"
          }`}
        >
          {userType === "interviewee"
            ? meetingId
              ? "Join Interview"
              : "Join"
            : meetingId
            ? "Start Interview"
            : "Start Interview"}
        </button>
      </div>
    </div>
  );
}
