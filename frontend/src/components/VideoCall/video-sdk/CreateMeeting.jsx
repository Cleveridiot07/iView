import { startInterview } from "../../../api/Interview/interview.api";
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkYzdkNzcyNy1hZmZhLTQyY2EtYmI5NS04MmE2MWMzZTgzNzAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMjI1Mzk0MCwiZXhwIjoxNzQwMDI5OTQwfQ.UMRKHs2Hr7J9J0trBZQLkEK-XEEYN9CKJy04eY9qehY";

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};




