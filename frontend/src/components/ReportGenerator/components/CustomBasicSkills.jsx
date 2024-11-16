"use client";

import {
  Plus,
  Edit2,
  Save,
  X,
  Trash2,
  Code,
  Brain,
  Users,
  Lightbulb,
  Puzzle,
  Zap,
  Target,
  Rocket,
} from "lucide-react";
import { useState } from "react";

const skillIcons = {
  Code,
  Brain,
  Users,
  Lightbulb,
  Puzzle,
  Zap,
  Target,
  Rocket,
};

export default function CustomBasicSkills({
  skillsList = [],
  isEditing = false,
  onSaveSkills,
}) {
  const [skills, setSkills] = useState(skillsList);
  const [editingId, setEditingId] = useState(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleEdit = (skill) => {
    setEditingId(skill.id);
  };

  const handleSave = (id, newRating) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id
        ? { ...skill, rating: Math.min(10, Math.max(0, newRating)) }
        : skill
    );
    setSkills(updatedSkills);
    setEditingId(null);
    onSaveSkills?.(updatedSkills); // Call the save callback if provided
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const randomIcon =
        Object.keys(skillIcons)[
          Math.floor(Math.random() * Object.keys(skillIcons).length)
        ];
      const updatedSkills = [
        ...skills,
        {
          id: Date.now().toString(),
          name: newSkillName,
          rating: 5,
          icon: randomIcon,
        },
      ];
      setSkills(updatedSkills);
      setNewSkillName("");
      setIsAddingSkill(false);
      onSaveSkills?.(updatedSkills); // Call the save callback if provided
    }
  };

  const handleDeleteSkill = (id) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
    onSaveSkills?.(updatedSkills); // Call the save callback if provided
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const SkillIcon = skillIcons[skill.icon];
          return (
            <div key={skill.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <SkillIcon className="text-blue-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {skill.name}
                  </h3>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    {editingId === skill.id ? (
                      <button
                        onClick={() => handleSave(skill.id, skill.rating)}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1 text-gray-600 hover:text-gray-700"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">
                  {editingId === skill.id ? (
                    <input
                      type="number"
                      value={skill.rating}
                      onChange={(e) =>
                        handleSave(skill.id, parseInt(e.target.value))
                      }
                      className="w-16 p-1 border rounded"
                      min="0"
                      max="10"
                    />
                  ) : (
                    skill.rating
                  )}
                  <span className="text-gray-600">/10</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 rounded-full h-4 transition-all duration-300"
                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEditing && (
        <>
          {isAddingSkill ? (
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Enter skill name"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Save size={18} />
              </button>
              <button
                onClick={() => setIsAddingSkill(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingSkill(true)}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Plus size={18} />
              Add Skill
            </button>
          )}
        </>
      )}
    </div>
  );
}
