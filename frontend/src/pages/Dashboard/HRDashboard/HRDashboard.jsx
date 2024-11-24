import React, { useState, useEffect } from "react";
import { PlusCircle, Mail, Hash, Menu } from "lucide-react";
import { fetchHR } from "../../../api/HR/hr.api";
import InterviewListHR from "../../../components/HRInterviewList/InterviewListHR";
import ErrorNotification from "../../../components/Notification/ErrorNotification/ErrorNotification";
import CreateInterview from "../../../components/CreateInterview/CreateInterview";
import { X } from "lucide-react";

const HRDashboard = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [companyName,setCompanyName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [AddInterviewComponent, setAddInterviewComponent] = useState(false);

  // Fetch HR Data on component mount
  useEffect(() => {
    const fetcHRData = async () => {
      try {
        const response = await fetchHR();
        const hr = response.hrManager;
        setCompanyName(response.companyName);
        setName(hr.name);
        setEmail(hr.email);
        setPhoneNumber(hr.phoneNumber);
        setAvatar(response.profilePicture);
      } catch (error) {
        console.error(error.message);
        setError("Token is not valid");
      }
    };
    fetcHRData();
  }, []);

  const handleAddInterviewComponent = ()=>{
    setAddInterviewComponent(!AddInterviewComponent);
  }

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      {AddInterviewComponent && <CreateInterview handleAddInterviewComponent={handleAddInterviewComponent} hrCompany={companyName}/>}
      {AddInterviewComponent && (
        <button onClick={handleAddInterviewComponent} className="bg-black p-5 fixed top-0 right-0 z-50 text-white">
          <X/>
        </button>
      )}
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
                  src={avatar || "/placeholder.svg?height=192&width=192"}
                  alt="HR Profile"
                  className="rounded-sm object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold mb-1">{name || "HR"}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                <Mail className="w-4 h-4" />
                <span>{email || ""}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                <Hash className="w-4 h-4" />
                <span>{companyName || ""}</span>
              </div>
              <button className="w-full bg-[#2B579A] hover:bg-[#1E3F7D] text-white py-2 rounded-sm transition-colors">
                View
              </button>
            </div>
          </div>
          <button onClick={handleAddInterviewComponent} className="w-full bg-[#2B579A] hover:bg-[#1E3F7D] text-white py-2 rounded-sm transition-colors flex items-center justify-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add Interview
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
          <InterviewListHR />
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;
