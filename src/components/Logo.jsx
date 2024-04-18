import React from "react";
import ChirpLogo from "../images/ChirpLogo.png";

const Logo = ({ width = "100%", className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={ChirpLogo} alt="" width={width} />
    </div>
  );
};

export default Logo;
