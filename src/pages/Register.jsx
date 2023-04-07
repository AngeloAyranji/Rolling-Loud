import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [logHeight, setLogHeight] = useState(window.innerHeight);

  const {data: videoUrl} = useFetch("api/hero-video?populate=*");

  useEffect(() => {
    window.addEventListener("resize", setDimension);
  }, []);

  const setDimension = () => {
    setLogHeight(window.innerHeight - 64);
  };

  const handleRegister = async () => {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;
    if (email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
      setError(false);

      try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/auth/local/register',
          {
            username: email,
            email: email,
            password: password,
          });

        if (res) {
          sessionStorage.setItem("jwt", res.data.jwt);
          sessionStorage.setItem("email", res.data.user.email);
          sessionStorage.setItem("username", res.data.user.username);
          sessionStorage.setItem("userId", res.data.user.id);

          navigate("/");
        }
      } catch (err) {
        console.log("error", err);
      }
    }

    setError(true);
  }

  return (
    <div className="w-full h-full relative" style={{ height: logHeight - 64 }}>
      <div className="absolute w-full h-full left-0 top-0 overflow-hidden z-0">
        <video
          src={videoUrl?.attributes.video.data.attributes.url}
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
            <h1 className="text-secondary-content text-2xl font-extrabold mb- 8tracking-wide font-sans">
              Register now
            </h1>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Email
                </span>
              </label>
              <input
                id="registerEmail"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white"
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Password
                </span>
              </label>
              <input
                id="registerPassword"
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white bg-transparent"
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-bold tracking-wide text-secondary-content">
                  Confirm Password
                </span>
              </label>
              <input
                id="registerConfirmPassword"
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full input-primary bg-white bg-transparent"
              />
            </div>
            {error && <div>Invalid Email or Password</div>}
            <button onClick={handleRegister} className="btn btn-primary">SIGN UP</button>
            <p className="mt-14">
              Already have an account?{" "}
              <Link to="/login" className="link hover:text-base-100">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
