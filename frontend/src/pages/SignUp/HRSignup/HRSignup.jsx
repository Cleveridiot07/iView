import React, { useState, useRef } from 'react';
import { registerHR } from '../../../api/HR/hr.api'; // Adjust the path according to your project structure
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import SuccessNotification from '../../../components/Notification/SuccessNotification/SuccessNotification';

const HRSignup = () => {
  const [companyName, setCompanyName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Handle profile picture file change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('profilePicture', profilePicture);
    formData.append('hrManagerName', name);
    formData.append('hrManagerEmail', email);
    formData.append('hrManagerPhoneNumber', phoneNumber);
    formData.append('password', password);

    try {
      // Send form data to API
      const response = await registerHR(formData);
      console.log('HR registered successfully:', response);
      setSuccessMessage(response);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000); 
    } catch (error) {
      console.error('Error registering HR:', error);
      setErrorMessage(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000); 
    }
  };

  return (
    <>
      {/* Conditional Rendering of Error Box */}
      {showError && <ErrorNotification message={errorMessage} />}

      {/* Conditional Rendering of Success Box */}
      {showNotification && <SuccessNotification message={successMessage}/>}

      <div className='w-full min-h-[88vh] bg-background'>
        <div className="mx-auto max-w-[500px] space-y-6 py-12">
          <div className="space-y-2 text-center text-primary">
            <h1 className="text-3xl font-bold">Create an HR Account</h1>
            <p className="text-muted">Fill out the form below to get started.</p>
          </div>
          <div className="rounded-sm border bg-card text-card shadow-sm">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Profile Picture Preview and Input */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="absolute inset-0 object-cover w-full h-full rounded-sm"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-sm">
                      <span className="text-sm text-muted">No Image</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="profile-picture"
                  >
                    Upload Image
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="profile-picture"
                    accept=".jpg,.jpeg,.png"
                    type="file"
                    onChange={handleProfilePictureChange}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="company-name"
                >
                  Company Name
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="company-name"
                  placeholder="Company Name"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              {/* HR Manager Details */}
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  HR Manager Name
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  HR Manager Email
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="email@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="phone"
                >
                  HR Manager Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phone"
                  placeholder="+1 (555) 555-5555"
                  required
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="confirm-password"
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 rounded-sm bg-primary text-white font-bold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRSignup;
