'use client';

import { useState } from 'react';
import {
  Plus,
  Edit2,
  Save,
  X,
  Trash2,
  Code,
  Database,
  Server,
  Cloud,
  Lock,
  Globe,
  Cpu,
  Wifi,
} from 'lucide-react';

// interface Question {
//   id: string;
//   number: number;
//   text: string;
//   rating: number;
//   remark: string;
//   icon: keyof typeof questionIcons;
// }

const questionIcons = {
  Code,
  Database,
  Server,
  Cloud,
  Lock,
  Globe,
  Cpu,
  Wifi,
};

export default function CustomQuestions() {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      number: 1,
      text: 'Explain RESTful API architecture',
      rating: 8,
      remark: 'Good understanding of REST principles',
      icon: 'Globe',
    },
    {
      id: '2',
      number: 2,
      text: 'Describe the difference between SQL and NoSQL databases',
      rating: 7,
      remark: 'Solid grasp on database types',
      icon: 'Database',
    },
    {
      id: '3',
      number: 3,
      text: 'What are the benefits of using containerization?',
      rating: 9,
      remark: 'Excellent knowledge of Docker and containers',
      icon: 'Cloud',
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ text: '', rating: 5, remark: '' });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleEdit = (question) => {
    setEditingId(question.id);
  };

  const handleSave = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              [field]: field === 'rating' ? Math.min(10, Math.max(0,value)) : value,
            }
          : q
      )
    );
  };

  const handleAddQuestion = () => {
    if (newQuestion.text.trim()) {
      const randomIcon = Object.keys(questionIcons)[
        Math.floor(Math.random() * Object.keys(questionIcons).length)
      ];
      setQuestions([
        ...questions,
        {
          id: Date.now().toString(),
          number: questions.length + 1,
          text: newQuestion.text,
          rating: newQuestion.rating,
          remark: newQuestion.remark,
          icon: randomIcon,
        },
      ]);
      setNewQuestion({ text: '', rating: 5, remark: '' });
      setIsAddingQuestion(false);
    }
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(
      questions.filter((q) => q.id !== id).map((q, index) => ({ ...q, number: index + 1 }))
    );
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#22c55e'; // Green
    if (rating >= 5) return '#facc15'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Interview Questions Assessment</h2>
      <div className="space-y-6">
        {questions.map((question) => {
          const QuestionIcon = questionIcons[question.icon];
          return (
            <div key={question.id} className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <div className="flex-grow pr-4">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <QuestionIcon className="text-blue-500" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Question {question.number}
                      </h3>
                      <div className="flex gap-2">
                        {editingId === question.id ? (
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Save size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(question)}
                            className="p-1 text-gray-600 hover:text-gray-700"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    {editingId === question.id ? (
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleSave(question.id, 'text', e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                      />
                    ) : (
                      <p className="text-gray-600 mb-2">{question.text}</p>
                    )}
                    {editingId === question.id ? (
                      <input
                        type="text"
                        value={question.remark}
                        onChange={(e) => handleSave(question.id, 'remark', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Add a remark"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">{question.remark}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-24 h-24 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={getRatingColor(question.rating)}
                    strokeWidth="10"
                    strokeDasharray={`${question.rating * 28.27}, 282.7`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {editingId === question.id ? (
                    <input
                      type="number"
                      value={question.rating}
                      onChange={(e) => handleSave(question.id, 'rating', e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold border rounded-full"
                      min="0"
                      max="10"
                    />
                  ) : (
                    <span className="text-2xl font-bold">{question.rating}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAddingQuestion ? (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <input
            type="text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            placeholder="Enter new question"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex items-center gap-4 mb-2">
            <input
              type="number"
              value={newQuestion.rating}
              onChange={(e) => setNewQuestion({ ...newQuestion, rating: Number(e.target.value) })}
              className="w-16 p-2 border rounded"
              min="0"
              max="10"
            />
            <input
              type="text"
              value={newQuestion.remark}
              onChange={(e) => setNewQuestion({ ...newQuestion, remark: e.target.value })}
              placeholder="Add a remark"
              className="flex-grow p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => setIsAddingQuestion(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingQuestion(true)}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={18} />
          Add Question
        </button>
      )}
    </div>
  );
}
