import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import {
  Card,
  Typography,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet";
import { useCountries } from "use-react-countries";

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const { data: videoUrl } = useFetch("api/hero-video?populate=*");
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  const [callingCode, setCallingCode] = useState(1);

  const handleRegister = async () => {
    console.log(country);
    const firstName = document.getElementById("registerFirstName").value;
    const lastName = document.getElementById("registerLastName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const phone = document.getElementById("registerPhone").value;

    const phoneNb = callingCode + " " + phone;
    console.log(phoneNb);
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      phoneNb !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setError(false);

      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "api/auth/local/register",
          {
            firstName: firstName,
            lastName: lastName,
            phoneNb: phoneNb,
            email: email,
            password: password,
            region: localStorage.getItem("region"),
          }
        );

        if (res) {
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("username", res.data.user.username);

          navigate("/");
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
        <title>SkyShop - Register</title>
      </Helmet>

      <div className="w-full h-full min-h-screen min-w-screen relative">
        <div className="absolute w-full h-full left-0 top-0 overflow-hidden z-0">
          {/* <video
            src={videoUrl?.attributes.video.data.attributes.url}
            playsInline
            autoPlay
            muted
            alt=""
            className="h-full w-full object-cover object-center brightness-[0.4] blur-sm"
          ></video> */}
        </div>
        <div className=" absolute left-0 top-0 w-full h-full flex items-center justify-center z-[50] pt-[64px]">
          <div className="w-full md:min-w-[600px] lg:min-w-[600px] h-full flex flex-col my-auto bg-transparent items-center justify-center p-4 md:p-14">
            <Card
              color="transparent"
              shadow={false}
              className="border border-primary p-4 md:p-8 rounded-lg"
            >
              <Typography variant="h3" color="white" className="font-bold">
                Register
              </Typography>
              <Typography color="white" className="mt-1 font-normal">
                Enter your details to register.
              </Typography>
              <div role="form" className="mt-8 mb-2 w-70 sm:w-full">
                <div className="mb-4 flex flex-col gap-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Input
                      id="registerFirstName"
                      size="lg"
                      label="First Name"
                      color="cyan"
                      className="text-secondary-content"
                      error={error}
                    />
                    <Input
                      id="registerLastName"
                      size="lg"
                      label="Last Name"
                      color="cyan"
                      className="text-secondary-content"
                      error={error}
                    />
                  </div>
                  <Input
                    id="registerEmail"
                    size="lg"
                    label="Email"
                    color="cyan"
                    className="text-secondary-content"
                    error={error}
                  />
                  <div className="relative flex w-full">
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          ripple={false}
                          variant="text"
                          color="blue-gray"
                          className="flex items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-300 bg-blue-gray-500/10 pl-3 h-[44px]"
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          {countryCallingCode}
                        </Button>
                      </MenuHandler>
                      <MenuList className="max-h-[20rem] max-w-[18rem] overflow-y-scroll scrollbar-custom">
                        {countries.map(
                          ({ name, flags, countryCallingCode }, index) => {
                            return (
                              <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => {
                                  setCountry(index);
                                  setCallingCode(
                                    countries[index].countryCallingCode
                                  );
                                }}
                              >
                                <img
                                  src={flags.svg}
                                  alt={name}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                                {name}{" "}
                                <span className="ml-auto">
                                  {countryCallingCode}
                                </span>
                              </MenuItem>
                            );
                          }
                        )}
                      </MenuList>
                    </Menu>
                    <Input
                      id="registerPhone"
                      error={error}
                      type="tel"
                      placeholder="Mobile Number"
                      color="cyan"
                      className="rounded-l-none h-[44px] focus:!border-primary text-secondary-content"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                  <Input
                    id="registerPassword"
                    type="password"
                    size="lg"
                    label="Password"
                    color="cyan"
                    className="text-secondary-content"
                    error={error}
                  />
                  <Input
                    id="registerConfirmPassword"
                    type="password"
                    size="lg"
                    color="cyan"
                    className="text-secondary-content focus:outline-none"
                    label="Confirm Password"
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
                  onClick={handleRegister}
                >
                  Register
                </button>
                <Typography className="mt-4 text-center font-normal text-secondary-content">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium link transition-colors hover:text-blue-gray-400"
                  >
                    Sign In
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

export default Register;
