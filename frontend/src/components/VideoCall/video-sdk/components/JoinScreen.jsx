// JoinScreen.jsx
import React, { useState } from "react";

function JoinScreen({ getMeetingAndToken, userType = "user" }) {
  const [meetingId, setMeetingId] = useState(null);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className="flex flex-col justify-center">
      {userType === "interviewee" ? (
        <div className="">
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => setMeetingId(e.target.value)}
          />
          <button className="bg-green-400 p-5 rounded-md" onClick={onClick}>
            Join
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-10">
          <input
            type="text"
            className="p-2"
            placeholder="Enter Meeting Id"
            onChange={(e) => setMeetingId(e.target.value)}
          />
          <button className="bg-green-400 p-5 rounded-md" onClick={onClick}>
            Start Meeting
          </button>

          <div className="p w-full text-center">OR</div>
          <button className="bg-gray-200 text-gray-900 p-5 rounded-md" onClick={onClick}>
            Create Meeting
          </button>
        </div>
      )}
    </div>
  );
}

export default JoinScreen;
