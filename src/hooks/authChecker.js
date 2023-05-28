import { createContext, useEffect } from "react";
import { useJwt } from "react-jwt";

const AuthCheckerContext = createContext(null);

export const AuthCheckerProvider = ({ children }) => {

    const { decodedToken } = useJwt(localStorage.getItem("jwt") ? localStorage.getItem("jwt") : undefined);

    useEffect(() => {
        if(decodedToken !== null && decodedToken?.exp * 1000 < new Date().valueOf()) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
        }
    }, [decodedToken]);

  return (
    <AuthCheckerContext.Provider value={{}}>
      {children}
    </AuthCheckerContext.Provider>
  );
};