import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { getInterviewsByHRId } from '../../api/Interview/interview.api';
import { useNavigate } from 'react-router-dom';



export default function InterviewListHR() {
  const [activeTab, setActiveTab] = useState('Upcoming')
  const [interviewList,setInterviewList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchIntervies = async()=>{
      const data = await getInterviewsByHRId();
      setInterviewList(data);
    }
    fetchIntervies();
  },[]);

  const handleStartInterview = (id)=>{


      navigate(`/interview/room/${id}`)
  
  }


  const isToday = (dateStr) => {
    const today = new Date()
    const interviewDate = new Date(dateStr)
    return (
      interviewDate.getDate() === today.getDate() &&
      interviewDate.getMonth() === today.getMonth() &&
      interviewDate.getFullYear() === today.getFullYear()
    )
  }

  const filteredInterviews = interviewList ?  interviewList.filter(interview => interview.status === activeTab) : []

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Status Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        {['Upcoming', 'Ongoing', 'Completed', 'Missed'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors
              ${activeTab === status 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
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
            <div key={index} className="bg-card rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    {/* Profile Image Placeholder */}
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">{interview.intervieweeEmail}</p>
                      <h3 className="text-xl font-semibold">{interview.position}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(interview.date), 'MMM dd, yyyy')} at {interview.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button 
                    className="px-4 py-2 text-sm font-medium rounded-md border hover:bg-muted transition-colors"
                  >
                    View Resume
                  </button>
                  
                  <button
                    disabled={!isToday(interview.date)}
                    onClick={()=> handleStartInterview(interview._id)}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Interview
                  </button>

                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-sm rounded-full 
                      ${interview.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : ''}
                      ${interview.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${interview.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${interview.status === 'Missed' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card rounded-lg shadow-lg p-6 flex items-center justify-center h-[400px]">
            <p className="text-center text-muted-foreground">
              No {activeTab.toLowerCase()} interviews found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}