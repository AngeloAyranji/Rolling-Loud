import { useState, createContext, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegionCheckerContext = createContext(null);

export const RegionCheckerProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [region, setRegion] = useState(localStorage.getItem("region"));
  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    if (location.pathname !== "/country") {
      if (!region) {
        navigate("/country", { state: { from: location } });
      } else {
      }
    }
  }, [location]);

  useEffect(() => {
    if(region === "europe") setCurrency("€")
    else setCurrency("$")
  }, [region])

  return (
    <RegionCheckerContext.Provider value={{ region, setRegion, currency }}>
      {children}
    </RegionCheckerContext.Provider>
  );
};

export const useRegionChecker = () => {
  return useContext(RegionCheckerContext);
};
