import React, { useState, useEffect } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useLocation } from "react-router-dom"; // to extract URL parameters
import Controls from "./Controls";
import ParticipantView from "./ParticpiantView.jsx";
import MeetingPreview from "./MeetingPreview.jsx";
import JoiningMeetingScreen from "./JoiningMeetingScreen.jsx";
import { startInterview } from "../../../../api/Interview/interview.api.js"; // import startInterview API

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
      console.log("Meeting Joined: ", props.meetingId);

      // Call startInterview with meetingId and interviewId from URL params when meeting is joined
      if (props.meetingId && interviewId) {
        startInterview({ interviewID: interviewId, meetingID: props.meetingId })
          .then((response) => {
            console.log("Interview started successfully:", response);
          })
          .catch((error) => {
            console.error("Error starting interview:", error);
          });
      }
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  // Extract interviewId and meetingId from the URL parameters using useLocation
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const interviewId = searchParams.get("interviewID");
  const meetingId = searchParams.get("meetingID");

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="w-full h-full bg-[#1E1E1E] flex flex-col justify-between">
      {joined && joined === "JOINED" ? (
        <div className="flex-1 overflow-y-auto px-6">
          <div className="flex flex-col justify-around h-full">
            {[...participants.keys()].map((participantId) => (
              <div key={participantId} className="rounded-lg px-2 flex justify-center w-full h-full">
                <ParticipantView participantId={participantId} key={participantId} />
              </div>
            ))}
          </div>
        </div>
      ) : joined && joined === "JOINING" ? (
        <JoiningMeetingScreen />
      ) : (
        <MeetingPreview JoinMeeting={joinMeeting} />
      )}

      {/* Control buttons at the bottom */}
      {joined && joined === "JOINED" && (
        <div className="bg-[#121212] py-3 px-6 flex justify-center">
          <Controls />
        </div>
      )}
    </div>
  );
}

export default MeetingView;
