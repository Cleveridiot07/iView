'use client'

import { useState } from 'react'
import { Edit2, Trash2, Plus, Save, X, ChevronDown, ChevronUp, Zap, AlertTriangle, TrendingUp } from 'lucide-react'

export default function CustomFeedBack() {
  const [sections, setSections] = useState({
    strengths: [
      'Strong problem-solving abilities',
      'Excellent communication skills',
      'Deep knowledge of React ecosystem'
    ],
    weaknesses: [
      'Limited experience with backend technologies',
      'Need improvement in system design',
    ],
    improvements: [
      'Focus on learning Node.js and Express',
      'Practice more system design problems',
      'Contribute to open source projects'
    ]
  })

  const [editing, setEditing] = useState(null)
  
  const [newItem, setNewItem] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    strengths: true,
    weaknesses: true,
    improvements: true
  })

  const handleEdit = (section, index, value) => {
    setSections(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }))
  }

  const handleDelete = (section, index) => {
    setSections(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const handleAdd = (section) => {
    if (newItem.trim()) {
      setSections(prev => ({
        ...prev,
        [section]: [...prev[section], newItem.trim()]
      }))
      setNewItem('')
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const sectionIcons = {
    strengths: <Zap className="w-6 h-6 text-yellow-500" />,
    weaknesses: <AlertTriangle className="w-6 h-6 text-red-500" />,
    improvements: <TrendingUp className="w-6 h-6 text-green-500" />
  }

  const renderSection = (title, section, items) => (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => toggleSection(section)}
        className="w-full px-6 py-4 flex items-center justify-between text-left border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          {sectionIcons[section]}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {expandedSections[section] && (
        <div className="p-6">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-start group">
                {editing?.section === section && editing?.index === index ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleEdit(section, index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setEditing(null)}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                      aria-label="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="p-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                      aria-label="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-start justify-between">
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setEditing({ section, index })}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(section, index)}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Add new item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAdd(section)}
            />
            <button
              onClick={() => handleAdd(section)}
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              aria-label="Add item"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      {renderSection('Strengths', 'strengths', sections.strengths)}
      {renderSection('Weaknesses', 'weaknesses', sections.weaknesses)}
      {renderSection('Areas for Improvement', 'improvements', sections.improvements)}
    </div>
  )
}