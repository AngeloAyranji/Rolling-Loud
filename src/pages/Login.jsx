import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { Card, Input, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(false);
  const [logHeight, setLogHeight] = useState(window.innerHeight);

  const { data: videoUrl } = useFetch("api/hero-video?populate=*");

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

    if (email !== "" && password !== "") {
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
          setError(false);
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("username", res.data.user.username);

          if (location.state?.from) {
            navigate(location.state.from, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
      } catch (err) {
        console.log("error", err);
      }
    }
    setError(true);
  };

  return (
    <Fragment>
      <Helmet>
        <title>SkyShop - Login</title>
      </Helmet>
      <div className="w-full h-full relative" style={{ height: logHeight }}>
        <div className="absolute w-full h-full left-0 top-0 overflow-hidden z-0">
          <video
            src={videoUrl?.attributes.video.data.attributes.url}
            playsInline
            loop
            autoPlay
            muted
            type="video/mp4"
            alt=""
            className="h-full w-full object-cover object-center brightness-[0.4] blur-sm"
          ></video>
        </div>
        <div className=" absolute left-0 top-0 w-full h-full flex items-center justify-center z-[50]">
          <div className="w-full md:min-w-[600px] lg:min-w-[600px] h-full flex flex-col my-auto bg-transparent items-center justify-center p-4 md:p-14">
            <Card
              color="transparent"
              shadow={false}
              className="border border-primary p-4 md:p-8 rounded-lg"
            >
              <Typography variant="h3" color="white" className="font-bold">
                Log In
              </Typography>
              <Typography color="white" className="mt-1 font-normal">
                Enter your details to login.
              </Typography>
              <div
                role="form"
                className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96"
              >
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    id="email"
                    size="lg"
                    label="Email"
                    color="cyan"
                    className="text-secondary-content"
                    error={error}
                  />
                  <Input
                    id="password"
                    type="password"
                    size="lg"
                    color="cyan"
                    className="text-secondary-content focus:outline-none"
                    label="Password"
                    error={error}
                  />
                </div>
                {error && (
                  <p className="text-secondary-content font-light mb-2">
                    Invalid Credentials
                  </p>
                )}
                <button
                  className="btn btn-primary w-full mt-4"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <Typography className="mt-4 text-center font-normal text-secondary-content">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium link transition-colors hover:text-blue-gray-400"
                  >
                    Sign Up
                  </Link>
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
