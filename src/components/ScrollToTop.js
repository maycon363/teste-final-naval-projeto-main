import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      color="success"
      aria-label="role de volta ao topo"
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: isVisible ? "flex" : "none",
      }}
    >
      <KeyboardArrowUp />
    </Fab>
  );
};

export default ScrollToTop;