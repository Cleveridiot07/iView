import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticpiantView.jsx";
import MeetingPreview from "./MeetingPreview.jsx";
import JoiningMeetingScreen from "./JoiningMeetingScreen.jsx";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
      console.log(props.meetingId);
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

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
              <div key={participantId} className="  rounded-lg px-2 flex justify-center w-full h-full">
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
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
        <div className=" bg-[#121212] py-3 px-6 flex justify-center">
          <Controls />
        </div>
      )}
    </div>
  );
}

export default MeetingView;
