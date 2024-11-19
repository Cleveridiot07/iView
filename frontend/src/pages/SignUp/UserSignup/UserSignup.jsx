import React, { useState, useRef } from 'react';
import OTPBox from '../../../components/OTPBox/OTPBox';
import { signInWithPhoneNumber } from 'firebase/auth';
import { registerUser } from '../../../api/Users/user.api';
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import SuccessNotification from '../../../components/Notification/SuccessNotification/SuccessNotification';
import {useNavigate} from "react-router-dom";

const UserSignup = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName,setLastName] = useState('');
  // const [email,setEmail] = useState('');
  // const [languagePreference,setLanguagePreference] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isOTPBoxOpen, setIsOTPBoxOpen] = useState(false);
  const navigate = useNavigate();


  // Refs for form inputs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const languageRef = useRef(null);
  const resumeRef = useRef(null);

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

  // Handle verifyOTP
  const handleVerifyOTP = () => {
    setIsOTPBoxOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append('username', firstNameRef.current.value +" "+ lastNameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('phoneNumber', phoneRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('languagePreference', languageRef.current.value);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    if (resumeRef.current.files[0]) {
      formData.append('resumePDF', resumeRef.current.files[0]);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }
    try {
      // Send form data to API
      const response = await registerUser(formData);
      console.log('User registered successfully:', response);
      setSuccessMessage(response);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/user/signin");
      }, 5000); 
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000); 
    }
  };

  return (
    <>
      {/* Conditional Rendering of OTP Box */}
      {isOTPBoxOpen && (
        <OTPBox closeBox={() => setIsOTPBoxOpen(false)} />
      )}
      {/* Conditional Rendering of Error Box */}
      {showError && <ErrorNotification message={errorMessage} />}

      {/* Conditional Rendering of Success Box */}
      {showNotification && <SuccessNotification message={successMessage}/>}


      <div className='w-full min-h-[88vh] bg-background'>
        <div className="mx-auto max-w-[800px] space-y-6 py-12">
          <div className="space-y-2 text-center text-primary">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted">Fill out the form below to get started.</p>
          </div>
          <div className="rounded-sm border text-card shadow-sm">
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
                    className="flex h-10 w-full bg-gray-100 rounded-sm border border-input  px-3 py-2 text-sm text-muted ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="profile-picture"
                    accept=".jpg,.jpeg,.png"
                    type="file"
                    onChange={handleProfilePictureChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="first-name"
                    placeholder="John"
                    required
                    ref={firstNameRef}

                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm  file:text-primary file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="last-name"
                    placeholder="Doe"
                    required
                    ref={lastNameRef}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="example@email.com"
                  required
                  type="email"
                  ref={emailRef}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phone"
                  placeholder="+1 (555) 555-5555"
                  required
                  type="tel"
                  ref={phoneRef}
                />
              </div>
              <div className="items-center p-6 flex flex-col gap-2">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm text-primary font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-accent hover:text-accent h-10 px-4 py-2"
                  type="button"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    required
                    type="password"
                    ref={passwordRef}
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
                    className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="confirm-password"
                    required
                    type="password"
                    ref={confirmPasswordRef}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="language"
                >
                  Language Preference
                </label>
                <select
                  className="flex h-10 w-full rounded-sm border border-input  px-3 py-2 text-sm text-muted ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="language"
                  required
                  ref={languageRef}
                >
                  <option value="">Select a language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="resume"
                >
                  Upload Resume
                </label>
                <input
                  className="flex h-10 w-full bg-gray-100 rounded-sm border border-input  px-3 py-2 text-sm text-muted ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  type="file"
                  ref={resumeRef}
                />
              </div>
              <div className="items-center p-6 flex flex-col gap-2">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm text-primary font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary hover:bg-primary/90 h-10 px-4 py-2"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
