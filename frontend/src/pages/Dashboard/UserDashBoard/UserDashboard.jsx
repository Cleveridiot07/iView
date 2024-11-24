import React, { useState, useEffect } from 'react';
import { UserInterviewList } from '../../../components/UserInterviewList/UserInterviewList';
import { getUser } from '../../../api/Users/user.api';
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import { useNavigate } from 'react-router-dom';
import { Mail, Hash, Menu } from 'lucide-react';

const UserDashboard = () => {
  const [image, setImage] = useState("./user2.png");
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("email");
  const [phonenumber, setPhoneNumber] = useState("123456");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        setImage(response.data.profilePicture);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        setError("Unauthorized");
        console.error("Error fetching user data:", error);
        setTimeout(() => {
          navigate("/user/signin");
        }, 2000);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {error && <ErrorNotification message={error} />}
      <div className="flex min-h-screen max-h-screen bg-[#0B1D39]">
        
        {/* Sidebar for larger screens & slide-in for small screens */}
        <aside
          className={`fixed inset-y-0 left-0 w-72 bg-white/10 p-6 backdrop-blur-sm flex flex-col transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0 z-20`}
        >
          <div className="flex-1">
            <div className="flex flex-col items-center text-white">
              <div className="relative w-48 h-48 mb-4">
                <img
                  src={image || "/placeholder.svg?height=192&width=192"}
                  alt="User Profile"
                  className="rounded-sm object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold mb-1">{username || "User"}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                <Mail className="w-4 h-4" />
                <span>{email || "user@mail.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                <Hash className="w-4 h-4" />
                <span>{phonenumber || "123456"}</span>
              </div>
              <button
                onClick={() => { navigate("/user/profile"); }}
                className="w-full bg-[#2B579A] hover:bg-[#1E3F7D] text-white py-2 rounded-sm transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
          <button
            className="w-full bg-[#2B579A] hover:bg-[#1E3F7D] text-white py-2 rounded-sm transition-colors"
          >
            Change Password
          </button>
        </aside>

        {/* Overlay for small screen when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Toggle Button for small screens */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleSidebar}
              className="bg-[#2B579A] hover:bg-[#1E3F7D] text-white py-2 px-4 rounded-sm flex items-center gap-2"
            >
              <Menu className="w-5 h-5" />
              Menu
            </button>
          </div>

          <h1 className="text-4xl font-bold text-white mb-8">Interviews</h1>
          <UserInterviewList />
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
