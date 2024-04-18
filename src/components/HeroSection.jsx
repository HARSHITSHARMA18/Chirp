import React from "react";
import ChirpHeroImage from "../images/Chirp-Hero-Image.png";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap w-full flex-col items-center justify-center p-6">
      <div className="flex flex-col">
        <h1 className="md:text-5xl font-bold text-[#B500FF] p-4 hover:underline decoration-white">
          Express Yourself Freely
        </h1>
        <h2 className="text-white md:text-2xl font-normal flex items-center justify-center">
          <span className="hover:underline decoration-yellow-400">
            Make it visual.
          </span>
          <span className="ml-1 hover:underline decoration-yellow-400">
            Make it count
          </span>
        </h2>
      </div>
      <div className="flex items-center justify-center p-6">
        <img src={ChirpHeroImage} alt="" width={"60%"} />
      </div>
    </div>
  );
};

export default HeroSection;
