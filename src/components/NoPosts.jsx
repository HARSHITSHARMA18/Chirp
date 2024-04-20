import React from "react";
import { Logo } from "./index";

const NoPosts = ({ text = "No Chirps" }) => {
  return (
    <div className="">
      <Logo width="30%" className="justify-center animate-bounce " />
      <h1 className="md:text-3xl font-bold text-white p-4 hover:underline decoration-[#B500FF]">
        {text}
      </h1>
    </div>
  );
};

export default NoPosts;
