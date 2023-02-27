import React from "react";
import Navbar from "../components/Navbar";

function Login() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-full h-full flex items-center">
        <div className="w-full md:min-w-[600px] lg:min-w-[600px] h-full flex flex-col my-auto bg-[#121212] items-center justify-center p-4 md:p-14 ">
          <div className="w-full max-w-[600px] bg-white flex flex-col p-8 rounded-lg">
            <h1 className="text-black text-2xl font-extrabold mb-2 tracking-wide font-sans">
              Log in to your account
            </h1>
            <p className="mb-14">
              Don't have an account?{" "}
              <a className="link hover:text-base-100">Sign Up here</a>
            </p>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-black">
                  Email
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white"
              />
            </div>

            <div className="form-control w-full mb-8">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-black">
                  Password
                </span>
                <span>
                  <a className="link text-primary">Forgot Password?</a>
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white"
              />
            </div>
            <button className="btn btn-primary">LOGIN</button>
          </div>
        </div>
        <div className="hidden md:block w-full h-full">
          <img
            src="https://cdn.pixabay.com/photo/2021/03/25/09/10/fog-6122490_960_720.jpg"
            alt=""
            className="object-cover brightness-[0.3] w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
