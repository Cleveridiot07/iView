// import {
//     CallControls,
//     CallingState,
//     SpeakerLayout,
//     StreamCall,
//     StreamTheme,
//     StreamVideo,
//     StreamVideoClient,
//     useCallStateHooks,
//   } from '@stream-io/video-react-sdk';
  
//   import '@stream-io/video-react-sdk/dist/css/styles.css';
//   import './style.css';
  
//   const apiKey = 'mmhfdzb5evj2';
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1phbV9XZXNlbGwiLCJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMxNjQ0MzkwLCJleHAiOjE3MzIyNDkxOTB9.DEEZDoOuStthh3yQelnvIuM7P6sKEP5Dx4PVD80-_NY';
//   const userId = 'Zam_Wesell';
//   const callId = 'vV79Acpakgy4';
  
//   const user = {
//     id: userId,
//     name: 'Oliver',
//     image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
//   };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', callId);
//   call.join({ create: true });
  
//   export default function StreamVideoCall() {
//     return (
//       <StreamVideo client={client}>
//         <StreamCall call={call}>
//           <MyUILayout />
//         </StreamCall>
//       </StreamVideo>
//     );
//   }
  
//   export const MyUILayout = () => {
//     const { useCallCallingState } = useCallStateHooks();
//     const callingState = useCallCallingState();
  
//     if (callingState !== CallingState.JOINED) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <StreamTheme>
//         <SpeakerLayout participantsBarPosition='bottom' />
//         <CallControls />
//       </StreamTheme>
//     );
//   };

import React from 'react'

const Stream = () => {
  return (
    <div>
      VC
    </div>
  )
}

export default Stream
