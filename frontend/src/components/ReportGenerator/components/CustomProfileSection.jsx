import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export default function CustomProfileSection({
  Editing = true,
  userData = {
    name: "Henry Beljiman",
    interviewDate: "2023-05-15",
    role: "Junior Developer",
    company: "Tech Corp",
    description: "Passionate about web development and new technologies.",
  },
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userData);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-semibold text-gray-600">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-full">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  Interviewed on:{" "}
                  {isEditing ? (
                    <input
                      type="date"
                      name="interviewDate"
                      value={profile.interviewDate}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <time dateTime={profile.interviewDate}>
                      {new Date(profile.interviewDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                  )}
                </p>
              </div>

              {/* Role Badge */}
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="text-sm border rounded px-2 py-1 focus:border-blue-500 outline-none"
                />
              ) : (
                <span className="flex items-center rounded-full w-48  bg-blue-50 px-2.5 py-1.5 text-sm font-medium text-blue-700">
                  <div className=""> {profile.role}</div>
                </span>
              )}
            </div>

            {/* Company and Description */}
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                  <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    placeholder="Role description"
                    className="w-full border rounded p-2 focus:border-blue-500 outline-none"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-700">{profile.company}</p>
                  <p className="text-gray-600">{profile.description}</p>
                </>
              )}
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex flex-col space-y-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </>
            ) : (
              <div className="">
                {Editing && (
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
