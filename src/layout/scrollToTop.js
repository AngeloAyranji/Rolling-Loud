import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop({ children }) {
  const location = useLocation();
  const navType = useNavigationType();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (navType === "POP") {
      setTimeout(() => scrollToTop(), 100);
    } else {
      scrollToTop();
    }
  }, [location]);

  return <>{children}</>;
}

export default ScrollToTop;
