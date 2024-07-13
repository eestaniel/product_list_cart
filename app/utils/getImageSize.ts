import {useEffect, useState} from "react"


export const getImageSize = () => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const returnImageSize = () => {
    if (windowSize < 768) {
      return "mobile";
    } else if (windowSize < 1024) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return returnImageSize();
}

