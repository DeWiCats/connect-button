import { useState, useEffect } from "react";

const useIsSmallScreen = (maxWidth: number) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= maxWidth);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }

    return;
  }, [maxWidth]);

  return isSmallScreen;
};

export default useIsSmallScreen;
