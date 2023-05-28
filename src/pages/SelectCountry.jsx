import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { removeAll } from "../redux/cartReducer";
import { useRegionChecker } from "../hooks/regionChecker";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

function SelectCountry() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: countries, loading } = useFetch(`api/shippings`);

  const { setRegion, setCountry } = useRegionChecker();

  const [regionTmp, setRegionTmp] = useState("");
  const [countryTmp, setCountryTmp] = useState("");

  const handleChange = () => {
    if (regionTmp !== "" && countryTmp !== ""){
      localStorage.setItem("region", regionTmp.toLowerCase());
      localStorage.setItem("country", countryTmp.toUpperCase());
      setRegion(regionTmp.toLowerCase());
      setCountry(countryTmp.toUpperCase());
      dispatch(removeAll());
      if (location.state !== null) navigate(location.state.from);
      else navigate("/");
    }
  };

  return (
    <>
      <Helmet>
        <title>Select Country</title>
      </Helmet>
      {!loading && countries ? (
      <div className="w-full mx-auto h-screen flex items-center justify-center p-8">
        <div className="h-[300px] rounded-xl border-2 border-primary max-w-xl p-8 flex flex-col justify-between">
          <h1 className="text-secondary-content text-2xl uppercase font-bold mb-4">
            Select Your Country
          </h1>
          <div className="w-full h-[1px] bg-gray-400 mb-4"></div>
          <Select
            color="cyan"
            label="Countries"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            className="!ml-0"
            onChange={(e) => {
              setRegionTmp(e.region);
              setCountryTmp(e.code)
            }}
          >
            {countries?.map((country, index) => (
              <Option key={index} value={country.attributes}>
                {country.attributes.country_name}
              </Option>
            ))}
          </Select>
          <button className="btn btn-primary mt-4" onClick={handleChange}>
            Select
          </button>
        </div>
      </div>
      ) : ( 
        <Loading />
      )}
    </>
  );
}

export default SelectCountry;
