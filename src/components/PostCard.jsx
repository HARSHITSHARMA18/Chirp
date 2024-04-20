import React from "react";
import service from "../appwrite/config";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, content, featuredImage, userId }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="md:w-[20rem] w-[15rem] bg-gray-100 rounded-xl p-4 border-4 border-[#B500FF]">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold p-3 bg-[#d7a4eb] rounded-xl m-1">
            {title}
          </h2>

          <p className="text-black p-3 bg-[#e9d8f0] rounded-xl">
            {parse(content)}
          </p>
        </div>

        <div className="w-full justify-center mb-4 ">
          <img
            alt={title}
            src={service.getFilePreview(featuredImage)}
            className="rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
