import React, { useState } from 'react';
import { getUser } from '../../../api/Users/user.api';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import UpdateProfile from '../../../components/UpdateProfile/UpdateProfile';


const UserProfile = () => {
  const navigate = useNavigate();
  const [username,setUsername]= useState("username");
  const [email,setEmail]= useState("email");
  const [phoneNumber,setPhoneNumber]= useState("phone number");
  const [profilePicture,setProfilePicture]= useState("");
  const [error, setError] = useState("");
  const [languagePreference,setLanguagePreference]= useState("languages");
  const [resumePDF,setResumePDF]= useState("Resume");

  const fetchUserData = async () => {
    try {
      const response = await getUser();
      const user = response.data;
      setUsername(user.username);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setResumePDF(user.resumePDF);
      setProfilePicture(user.profilePicture);
    } catch (error) {

      console.error("Error fetching user data:", error);
      setError(error);
      setTimeout(()=>{
          navigate("/user/signin");   
      },2000);
    }
  };
  fetchUserData();
  return (
    <>
    {error && <ErrorNotification message={error} />}
    <div className="flex flex-col w-full bg-background min-h-screen bg-muted/40">
    <div className="max-w-3xl m-10 bg-card lg:min-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-32 h-32 rounded-sm shadow-xl bg-muted overflow-hidden">
          <img
            src={`${profilePicture}`}
            alt="User Profile"
            width="128"
            height="128"
            className="object-cover w-full h-full"
            style={{ aspectRatio: '128 / 128', objectFit: 'cover' }}
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl text-[#222222] font-bold">{username}</h1>
          <p className="text-muted">{email}</p>
          <p className="text-muted">{phoneNumber}</p>
        </div>
      </div>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-[#222222] font-bold">Personal Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="text-sm text-[#222222] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Name
              </label>
              <div
                className="flex h-10 w-full rounded-sm shadow-xl border border-input px-3 bg-primary py-2 tering-offset-background file:border-0 file:bg-transparent text-primary file:text-sm file:font-medium placeholder:text-muted
                disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                readOnly
              >
                {`${username}`}
                </div>
            </div>

            <div>
              <label
                className="text-sm text-[#222222] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="phone"
              >
                Phone
              </label>
              <div
                className="flex h-10 w-full rounded-sm shadow-xl border border-input bg-primary text-[#ffffff] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="phone"
                readOnly
              >
              {`${phoneNumber}`}
              </div>
            </div>
            <div>
              <label
                className="text-sm text-[#222222] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="language"
              >
                Language
              </label>
              <div
                className="flex h-10 w-full rounded-sm shadow-xl border border-input bg-primary text-[#ffffff] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="language"
                readOnly
                >{`${languagePreference}`}
                </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl text-[#222222] font-bold">Resume</h2>
          <div className="bg-muted rounded-sm shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-muted"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="text-sm text-[#222222] text-muted">Resume.pdf</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm shadow-xl text-sm text-[#222222] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-secondary hover:bg-accent hover:text-accent h-10 px-4 py-2"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
          <h2 className="text-xl text-[#222222] font-bold">Update Profile</h2>
          <button className="inline-flex text-[#222222] bg-secondary items-center justify-center whitespace-nowrap rounded-sm shadow-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent h-10 px-4 py-2">
              Update Profile
          </button>
      </div>
      <UpdateProfile/>
    </div>
    
    </div>
    
    
    

    </>
  );
};

export default UserProfile;
