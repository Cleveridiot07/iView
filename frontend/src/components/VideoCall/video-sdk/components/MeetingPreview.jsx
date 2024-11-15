import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';

export default function MeetingPreview({ JoinMeeting }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      setError('Unable to access camera and microphone');
      console.error('Error accessing media devices:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(!isMicOn);
    }
  };

  const handleJoinMeeting = () => {
    JoinMeeting();
    console.log('Joining meeting...');
  };

  return (
    <div className="h-full bg-[#1E1E1E] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-[#2E2E2E]">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              {error}
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2">
            <button
              onClick={toggleCamera}
              className={`${
                !isCameraOn ? 'p-5 bg-red-500 text-white hover:bg-red-600 rounded-full' : 'p-5 bg-gray-500 rounded-full'
              }`}
            >
              {isCameraOn ? (
                <Camera className="h-5 w-5" />
              ) : (
                <CameraOff className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMic}
              className={`${
                !isMicOn ? 'p-5 bg-red-500 text-white hover:bg-red-600 rounded-full' : 'p-5 bg-gray-500 rounded-full'
              }`}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            onClick={handleJoinMeeting}
            className="bg-gray-200 text-gray-950 rounded-md hover:bg-gray-800 hover:text-gray-200 p-2"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
