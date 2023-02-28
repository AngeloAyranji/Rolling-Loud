import React, { useEffect, useState } from "react";
import bgVid from "../assets/Videos/pexels-mikhail-nilov-6981411.mp4";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [logHeight, setLogHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", setDimension);
  }, []);

  const setDimension = () => {
    setLogHeight(window.innerHeight - 64);
  };

  // handling login flow
  const handleLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email != "" && password != "") {
      setError(false);
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "api/auth/local",
          {
            identifier: email,
            password,
          }
        );

        if (res) {
          sessionStorage.setItem("jwt", res.data.jwt);
          sessionStorage.setItem("username", res.data.user.username);
          sessionStorage.setItem("email", res.data.user.email);

          navigate("/");
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
            <h1 className="text-secondary-content text-2xl font-extrabold mb-2 tracking-wide font-sans">
              Log in to your account
            </h1>
            <p className="mb-14">
              Don't have an account?{" "}
              <a className="link hover:text-base-100">Sign Up here</a>
            </p>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Email
                </span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white"
              />
            </div>

            <div className="form-control w-full mb-8">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Password
                </span>
                <span>
                  <a className="link text-primary">Forgot Password?</a>
                </span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white bg-transparent"
              />
            </div>
            {error && <div>Invalid Email or Password</div>}
            <button onClick={handleLogin} className="btn btn-primary">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
