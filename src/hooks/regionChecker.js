import { useState, createContext, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegionCheckerContext = createContext(null);

export const RegionCheckerProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [region, setRegion] = useState(localStorage.getItem("region"));

  useEffect(() => {
    if (location.pathname !== "/country") {
      console.log("regionnnnn", region);
      if (!region) {
        navigate("/country", { state: { from: location } });
      } else {
      }
    }
  }, [location]);

  return (
    <RegionCheckerContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionCheckerContext.Provider>
  );
};

export const useRegionChecker = () => {
  return useContext(RegionCheckerContext);
};
