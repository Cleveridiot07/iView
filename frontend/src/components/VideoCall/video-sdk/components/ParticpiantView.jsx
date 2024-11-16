import React, { useEffect, useMemo, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="rounded-2xl flex flex-col items-center justify-center w-full ">
      <div className="relative flex items-center justify-center w-full h-full  rounded-lg overflow-hidden">
        {webcamOn ? (
          <div className="rounded-lg overflow-hidden">
            <ReactPlayer
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              height="100%"
              width="100%"
              onError={(err) => console.log(err, "participant video error")}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Webcam is off</p>
          </div>
        )}
      </div>

      <audio ref={micRef} autoPlay muted={isLocal} />
    </div>
  );
}

export default ParticipantView;
