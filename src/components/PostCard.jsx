import React from "react";
import service from "../appwrite/config";
import parse from "html-react-parser";

const PostCard = ({ $id, title, content, featuredImage, userId }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-black">{parse(content)}</p>

        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
