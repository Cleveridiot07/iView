'use client'

import { useState } from 'react'
import { MessageCircle, Edit3, Trash2, Plus, Save, X, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function CustomFooter({ 
  feedbacksProp, 
  isEditing, 
  onFeedbackChange, 
  onAddFeedback 
}) {
  const [editing, setEditing] = useState(null)
  const [newFeedback, setNewFeedback] = useState({ text: '', sentiment: 'positive' })

  const handleEdit = (id, text, sentiment) => {
    const updatedFeedbacks = feedbacksProp.map(f => f.id === id ? { ...f, text, sentiment } : f)
    onFeedbackChange(updatedFeedbacks)
    setEditing(null)
  }

  const handleDelete = (id) => {
    const updatedFeedbacks = feedbacksProp.filter(f => f.id !== id)
    onFeedbackChange(updatedFeedbacks)
  }

  const handleAdd = () => {
    if (newFeedback.text.trim()) {
      const updatedFeedbacks = [
        ...feedbacksProp, 
        { id: Date.now(), ...newFeedback }
      ]
      onAddFeedback(updatedFeedbacks)
      setNewFeedback({ text: '', sentiment: 'positive' })
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <MessageCircle className="w-8 h-8 mr-2 text-blue-500" />
        Feedback
      </h2>

      <div className="space-y-4">
        {feedbacksProp.map(feedback => (
          <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            {editing === feedback.id && isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={feedback.text}
                  onChange={(e) => handleEdit(feedback.id, e.target.value, feedback.sentiment)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(feedback.id, feedback.text, 'positive')}
                      className={`p-1 rounded ${feedback.sentiment === 'positive' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(feedback.id, feedback.text, 'negative')}
                      className={`p-1 rounded ${feedback.sentiment === 'negative' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditing(null)}
                      className="p-1 text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="p-1 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-2">
                  {feedback.sentiment === 'positive' ? (
                    <ThumbsUp className="w-5 h-5 text-green-500 mt-1" />
                  ) : (
                    <ThumbsDown className="w-5 h-5 text-red-500 mt-1" />
                  )}
                  <p className="text-gray-700">{feedback.text}</p>
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditing(feedback.id)}
                      className="p-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="p-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <textarea
            value={newFeedback.text}
            onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
            placeholder="Add new feedback..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="mt-2 flex justify-between items-center">
            <div className="space-x-2">
              <button
                onClick={() => setNewFeedback({ ...newFeedback, sentiment: 'positive' })}
                className={`p-1 rounded ${newFeedback.sentiment === 'positive' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setNewFeedback({ ...newFeedback, sentiment: 'negative' })}
                className={`p-1 rounded ${newFeedback.sentiment === 'negative' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
