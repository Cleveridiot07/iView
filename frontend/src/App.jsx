import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/common/Navbar/Navbar";
import InterviewInterface from "./pages/InterviewInterface/InterviewInterface";
import WhiteboardContainer from "./components/Whiteboard/WhiteboardContainer";
import CodeApp from "./components/CodeEditor/CodeApp";
import UserDashboard from "./pages/Dashboard/UserDashBoard/UserDashboard";
import UserProfile from "./pages/Profile/UserProfile/UserProfile";
import UserSignup from "./pages/SignUp/UserSignup/UserSignup";
import SelectRole from "./pages/SelectRole/SelectRole";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UserSignIn from "./pages/SignIn/UserSignIn/UserSignIn";
import HRDashboard from "./pages/Dashboard/HRDashboard/HRDashboard";
import HRProfile from "./pages/Profile/HRProfile/HRProfile";
import HRSignup from "./pages/SignUp/HRSignup/HRSignup";
import HRSignIn from "./pages/SignIn/HRSignIn/HRSignIn";
import PhoneAuth from "./components/PhoneAuthentication/PhoneAuthnetication";
import VideoCallComponent from "./components/VideoCall/video-sdk/VideoCallComponent";
import SampleReport from "./components/ReportGenerator/SampleReport";
import SampleReportWeb from "./components/ReportGenerator/SampleReportWeb";
// import SocketComponent from './socket/SocketComponentTest';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<PhoneAuth />} />
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/signin" element={<UserSignIn />} />
        <Route path="/hr/signup" element={<HRSignup />} />
        <Route path="/hr/signin" element={<HRSignIn />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/profile" element={<HRProfile />} />
        <Route
          path="/interview/room/:roomID"
          element={<InterviewInterface room={true} />}
        />
        <Route
          path="/interview/room/test"
          element={<VideoCallComponent />}
        />
        {/* Test Route */}
        <Route path="/test" element={<SampleReportWeb />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
