import React, { useState, useEffect } from 'react';
import InterviewList from '../../../components/InterviewList/InterviewList';
import { getUser } from '../../../api/Users/user.api';
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import { getInterviewsByEmail } from '../../../api/Interview/interview.api';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [image, setImage] = useState("./user2.png");
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("email");
  const [interviewList, setInterviewList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await getUser();
      setImage(response.data.profilePicture);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      setError("Unauthorized");

      console.error("Error fetching user data:", error);
      setTimeout(()=>{
          navigate("/user/signin");
      },2000);
    }
  };

  const fetchInterviewList = async () => {
    try {
      const response = await getInterviewsByEmail();
      const selectedInterviews = response.map(({ position, date, intervieweeEmail, interviewier, status, time }) => ({
        position,
        date: new Date(date).toISOString().split('T')[0], // "2001-07-14"
        time: time, // Use the original time field directly
        candidateName: interviewier.hrManager.name, // Assuming candidateName should be the interviewee email
        companyName: interviewier.companyName, // Assuming companyName should be the interviewer ID
        status,
        report : "Pending",
      }));
  
      // Log selected interviews to confirm they are correctly mapped
      // console.log("Selected Interviews:", selectedInterviews);
  
      // Set the mapped interviews in state
      setInterviewList(selectedInterviews);


      // console.log("interview List: ",interviewList);
    } catch (error) {
      console.log("Error fetching interviews:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchInterviewList();
  }, []);

  useEffect(() => {
    // console.log("Updated Interview List:", interviewList); // This will log the updated list whenever it changes
  }, [interviewList]);
  return (
    <>
      {error && <ErrorNotification message={error} />}
      <div className="flex flex-col w-full bg-background min-h-screen bg-muted/40">
        <div className="flex flex-col w-full min-h-screen bg-muted/40">
          <main className="flex flex-1 flex-col lg:flex-row justify-center gap-4 p-4 md:gap-8 md:p-10">
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center md:flex md:flex-row md:justify-center">
              <div className="rounded-sm border bg-card text-card shadow-sm flex flex-col items-center justify-center" data-v0-t="card">
                <div className="space-y-1.5 flex flex-col items-center justify-center gap-2 p-6">
                  <span className="relative flex shrink-0 overflow-hidden rounded-sm h-16 w-16">
                    <img className="aspect-square h-full w-full" src={`${image}`} alt="User" />
                  </span>
                  <div className="text-center">
                    <div className="text-lg text-[#222222] font-semibold">{username}</div>
                    <div className="text-sm text-muted">{email}</div>
                  </div>
                </div>
                <div className="items-center flex justify-center gap-2 p-4">
                  <button onClick={()=>{navigate("/user/profile")}} className="inline-flex text-primary items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary hover:bg-accent hover:text-accent h-9 rounded-sm px-3">
                    View Profile
                  </button>
                  <button className="inline-flex text-primary items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary hover:bg-accent hover:text-accent h-9 rounded-sm px-3">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

              <InterviewList interviewList={interviewList} />

          </main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
