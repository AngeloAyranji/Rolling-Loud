import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { removeAll } from "../redux/cartReducer";
import { useRegionChecker } from "../hooks/regionChecker";

function SelectCountry() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setRegion } = useRegionChecker();

  const [regionTmp, setRegionTmp] = useState("");

  const handleChange = () => {
    if (regionTmp === "") return;
    else {
      localStorage.setItem("region", regionTmp.toLowerCase());
      setRegion(regionTmp.toLowerCase());
      dispatch(removeAll());
      if (location.state !== null) navigate(location.state.from);
      else navigate("/");
    }
  };

  return (
    <>
      <Helmet>
        <title>Select Region</title>
      </Helmet>
      <div className="w-full mx-auto h-screen flex items-center justify-center p-8">
        <div className="h-[300px] rounded-xl border-2 border-primary max-w-xl p-8 flex flex-col justify-between">
          <h1 className="text-secondary-content text-2xl uppercase font-bold mb-4">
            Select Your Region
          </h1>
          <div className="w-full h-[1px] bg-gray-400 mb-4"></div>
          <Select
            color="cyan"
            label="Regions"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            className="!ml-0"
            onChange={setRegionTmp}
          >
            <Option value={"Europe"}>Europe</Option>
            <Option value={"Gulf"}>Gulf</Option>
            <Option value={"Lebanon"}>Lebanon</Option>
          </Select>
          <button className="btn btn-primary mt-4" onClick={handleChange}>
            Select
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectCountry;
