import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import bgVid from "../assets/Videos/pexels-mikhail-nilov-6981411.mp4";

function ForgotEmail() {
  const [error, setError] = useState(false)
  const [logHeight, setLogHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", setDimension);
  }, []);

  const setDimension = () => {
    setLogHeight(window.innerHeight - 64);
  };

  const handleReset = async () => {
    const email = document.getElementById("forgotEmail").value;

    if (email != "") {
      setError(false);
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "api/auth/forgot-password",
          {
            email
          }
        );

        if (res) {
          console.log(res)
        }
      } catch (err) {
        console.log("error", err);
      }
    }

    setError(true);
  };

  return (
    <div className="w-full h-full relative" style={{ height: logHeight - 64 }}>
      <div className="absolute w-full h-full left-0 top-0 overflow-hidden z-0">
        <video
          src={bgVid}
          loop
          autoPlay
          muted
          alt=""
          className="h-full w-full object-cover object-center brightness-[0.4] blur-sm"
        ></video>
      </div>
      <div className=" absolute left-0 top-0 w-full h-full flex items-center justify-center z-[50]">
        <div className="w-full md:min-w-[600px] lg:min-w-[600px] h-full flex flex-col my-auto bg-transparent items-center justify-center p-4 md:p-14">
          <div className="w-full max-w-[600px] border-2 border-primary flex flex-col p-8 rounded-lg">
            <h1 className="text-secondary-content text-2xl font-extrabold mb-8 tracking-wide font-sans">
              Forgot Password
            </h1>
            <p className="mt-2">
              We'll send you an email with a link to reset your password
            </p>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Email
                </span>
              </label>
              <input
                id="forgotEmail"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white"
              />
            </div>
            {error && <div>Invalid Email</div>}
            <button onClick={handleReset} className="btn btn-primary">SEND EMAIL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotEmail;
