// VideoCallComponent.jsx
import React, { useState } from "react";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import JoinScreen from "./components/JoinScreen.jsx";
import MeetingView from "./components/MeetingView.jsx";
import { authToken, createMeeting } from "./CreateMeeting.jsx";

function VideoCallComponent() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <div className="fixed h-screen w-screen flex items-center justify-center left-0 top-0 z-50 p-20 bg-[#212121]">
      <div className="">
      <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      </div>
    </div>
  );
}

export default VideoCallComponent;
