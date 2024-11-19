import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginHR } from '../../../api/HR/hr.api'; // Adjust the path according to your project structure
import ErrorNotification from '../../../components/Notification/ErrorNotification/ErrorNotification';
import SuccessNotification from '../../../components/Notification/SuccessNotification/SuccessNotification';
import Cookies from 'js-cookie';

const HRSignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async () => {
        const logindata = {
            email,
            password
        };

        try {
            const response = await loginHR(logindata);
            console.log(response);
            setNotification("Login successful!");
            setTimeout(() => {
                setNotification("");
                navigate("/hr/dashboard"); // Redirect to HR dashboard or appropriate route
            }, 2000);
        } catch (err) {
            console.error('Login Error:', err.response?.data?.message); // Log the error message
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <div>
            {error && <ErrorNotification message={error} />}
            {notification && <SuccessNotification message={notification} />}
            <section className="bg-background w-full h-full">
            <p className='text-center text-primary pt-10 text-2xl'>Login As Interviewer</p>
                <div className="container h-full flex items-center justify-center mx-auto px-6 py-24">
                    <div className="flex flex-wrap w-full lg:w-10/12 items-center justify-around lg:justify-between">
                        {/* Left column container with background */}
                        <div className="mb-12 md:mb-0 w-full md:w-8/12 lg:w-6/12 flex justify-center">
                            <img
                                src="/signin.jpg"
                                className="w-full"
                                alt="Background image"
                            />
                        </div>

                        {/* Right column container with form */}
                        <div className="w-full md:w-8/12 lg:w-5/12 lg:ml-6 flex justify-center">
                            <form className="w-full">
                                {/* Email input */}
                                <div className="mb-6">
                                    <label className="block text-lg font-medium text-primary">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password input */}
                                <div className="mb-6">
                                    <label className="block text-lg font-medium text-primary">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Remember me checkbox */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 border-gray-300 rounded smcus:ring-primary-500"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-primary"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Forgot password link */}
                                    <div className="text-sm">
                                        <a
                                            href="#!"
                                            className="font-medium text-primary hover:text-primary-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                {/* Submit button */}
                                <div>
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        onClick={handleSignIn}
                                    >
                                        Sign in
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="mt-6 relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-500">Not Registered?</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                {/* Register */}
                                <div className="flex flex-col space-y-3">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-secondary hover:bg-[#3ea1ec] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        onClick={() => navigate("/hr/signup")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HRSignIn;
