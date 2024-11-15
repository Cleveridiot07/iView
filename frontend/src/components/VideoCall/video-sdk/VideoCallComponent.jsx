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
    <div className=" ">
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    </div>
  );
}

export default VideoCallComponent;
