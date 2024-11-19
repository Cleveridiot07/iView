import React, { useState } from "react";
import { fetchHR } from "../../../api/HR/hr.api"
import InterviewListHR from "../../../components/HRInterviewList/InterviewListHR";
import ErrorNotification from "../../../components/Notification/ErrorNotification/ErrorNotification";

const HRDashboard = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [phonenumber, setPhoneNumber] = useState(" ");
  const [avatar, setAvatar] = useState(" ");

  const fetcHRData = async () => {
    try {
      const response = await fetchHR();
      const hr = response.hrManager;
      setName(hr.name);
      setEmail(hr.email);
      setPhoneNumber(hr.phoneNumber);
      setAvatar(response.profilePicture);
    } catch (error) {
      console.error(error.message);
      setError("Token is not valid");
    }
  };

  const data = [];

  fetcHRData();
  return (
    <>
      {error && <ErrorNotification message={error} />}
      <div className="w-full min-h-screen flex flex-col bg-background sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 p-4 bg-secondary  rounded-xl w-full">
            {/*  */}
            <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 min-h-[50vh] dark:text-gray-800">
              <img
                src={`${avatar}`}
                alt=""
                className="w-full rounded-sm shadow-xl"
              />
              <div>
                <h2 className="text-xl text-center font-semibold">{name}</h2>
                <span className="block pb-2 text-sm text-center dark:text-gray-600">
                  {email}
                </span>
                <p className="text-center">{phonenumber}</p>
              </div>
              <div class="w-full mt-5">
                <div class="flex-1 h-full w-full mx-auto">
                  <div class="flex w-full bg-primary shadow rounded-lg px-10 py-3">
                    <p class="m-auto inset-0 font-semibold leading-7 text-center text-gray-800">
                      View
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <MainContent /> */}
        <main
          role="main"
          className="w-full h-full max-h-[100vh] flex-grow p-3 overflow-scroll"
        >
          <h1
            className="text-3xl text-primary md:text-5xl mb-4 font-extrabold"
            id="home"
          >
            Interviews
          </h1>
          <InterviewListHR/>
        </main>
      </div>
    </>
  );
};

export default HRDashboard;
