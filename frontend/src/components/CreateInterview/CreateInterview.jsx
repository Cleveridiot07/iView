import React, { useState } from 'react'
import { Calendar, Clock, Mail, Briefcase, FileText, AlertCircle } from 'lucide-react'
import { createInterview } from '../../api/Interview/interview.api' 
import SuccessNotification from '../Notification/SuccessNotification/SuccessNotification'
import ErrorNotification from '../Notification/ErrorNotification/ErrorNotification'

const getHRDetails = () => {
  return { company: 'Example Company' }
}

export default function CreateInterview({ handleAddInterviewComponent,hrCompany }) {
  const [interviewData, setInterviewData] = useState({
    intervieweeEmail: '',
    status: 'Upcoming',
    reportPDF: 'pending',
    date: '',
    time: '',
    position: '',
  })

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const company = getHRDetails().company

  const handleChange = (e) => {
    const { name, value } = e.target
    setInterviewData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Integrating company and position into a single field
    const interviewDataWithCompany = {
      ...interviewData,
      position: `${hrCompany} - ${interviewData.position}`, // Concatenate company and position
    }

    try {
      // Send the data to your backend using the createInterview function
      const response = await createInterview(interviewDataWithCompany)
      console.log('Interview Created:', response)

      // If interview creation is successful, display success message
      setSuccessMessage('Interview successfully created!')
      setErrorMessage(null)

      // Call the handleAddInterviewComponent function from props
      if (handleAddInterviewComponent) {
        setTimeout(() => {
          handleAddInterviewComponent();
        }, 3000); // Delay of 3 seconds (3000 milliseconds)
      }
      
      // Optionally, reset the form after successful submission
      setInterviewData({
        intervieweeEmail: '',
        status: 'Upcoming',
        reportPDF: 'pending',
        date: '',
        time: '',
        position: '',
      })
    } catch (error) {
      console.error('Error creating interview:', error)

      // If there's an error, display the error message
      setErrorMessage('Failed to create interview. Please try again.')
      setSuccessMessage(null)
    }
  }

  return (
    <div className="fixed p-5 overflow-auto w-screen h-screen bg-black bg-opacity-80 z-30">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-sm shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0B1D39]">Create New Interview</h2>
        
        {/* Display success or error notifications */}
        {successMessage && <SuccessNotification message={successMessage} />}
        {errorMessage && <ErrorNotification message={errorMessage} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="intervieweeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Interviewee Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="intervieweeEmail"
                  name="intervieweeEmail"
                  value={interviewData.intervieweeEmail}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B579A]"
                  placeholder="Enter email address"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position (Company will be prefixed)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={interviewData.position}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B579A]"
                  placeholder="Enter position"
                />
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={interviewData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B579A]"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={interviewData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B579A]"
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={interviewData.status}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label htmlFor="reportPDF" className="block text-sm font-medium text-gray-700 mb-1">
                Report PDF
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="reportPDF"
                  name="reportPDF"
                  value={interviewData.reportPDF}
                  readOnly
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm bg-gray-100 text-gray-600"
                />
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 bg-yellow-100 p-3 rounded-sm">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
            <p>The status is set to "Upcoming", the report PDF is "pending", and the company is integrated with the position.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B579A] text-white py-2 px-4 rounded-sm hover:bg-[#1E3F7D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2B579A] focus:ring-opacity-50"
          >
            Create Interview
          </button>
        </form>
      </div>
    </div>
  )
}
