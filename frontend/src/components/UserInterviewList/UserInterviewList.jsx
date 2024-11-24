import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getInterviewsByEmail } from '../../api/Interview/interview.api';
import { Calendar, User, ChevronRight } from 'lucide-react';

export function UserInterviewList() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [interviews, setInterviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviewsByEmail();
        if (data.message === 'No interview found') {
          setErrorMessage('No interviews found');
        } else {
          setInterviews(data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('No interviews found');
        } else {
          setErrorMessage('An error occurred while fetching interviews');
        }
      }
    };
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews
    ? interviews.filter((interview) => interview.status === activeTab)
    : [];

  const handleGoToInterview = (interviewID) => {
    navigate(`/user/interview/room/?interviewID=${interviewID}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Status Tabs */}
      <div className="flex space-x-2 mb-6 border-b overflow-x-auto">
        {['Upcoming', 'Ongoing', 'Completed', 'Missed'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 font-medium rounded-t-sm transition-colors whitespace-nowrap ${
              activeTab === status
                ? 'bg-primary text-primary-foreground text-white'
                : 'hover:bg-muted text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Interview Cards Container */}
      <div className="space-y-4 min-h-[400px]">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview, index) => (
            <div
              key={index}
              className="bg-white rounded-sm p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg transition-all"
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full">
                <User className="w-8 h-8 text-gray-400 shrink-0" />
                <div className="flex-1">
                  <div className="text-gray-500 text-sm truncate">{interview.email}</div>
                  <div className="font-semibold text-lg truncate">{interview.position}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>
                      {format(new Date(interview.date), 'MMM dd, yyyy')} at{' '}
                      {interview.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                {interview.status === 'Ongoing' && (
                  <button
                    onClick={() => handleGoToInterview(interview._id)}
                    className="text-[#2B579A] hover:text-[#1E3F7D] text-sm font-medium"
                  >
                    Go to Interview
                  </button>
                )}
                {/* <button className="text-[#2B579A] hover:text-[#1E3F7D] text-sm font-medium">
                  View Resume
                </button> */}
                <button className="flex items-center gap-1 text-[#2B579A] hover:text-[#1E3F7D] text-sm font-medium">
                  {interview.status}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-sm p-6 flex items-center justify-center shadow-lg h-[400px]">
            <p className="text-center text-muted-foreground">
              No {activeTab.toLowerCase()} interviews found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
