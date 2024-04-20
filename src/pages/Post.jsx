import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData?.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");

    return () => {
      // console.clear();
    };
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-[#B500FF] underline decoration-white">
            {post.title}
          </h1>
        </div>
        <div className="browser-css p-4">
          <p className="text-white/60 text-[1.2rem]">{parse(post.content)}</p>
        </div>
        <div className="w-full flex justify-center mb-4 relative border-[#B500FF] border-b-[6px] border-r-[6px] border-l-[0.2px] border-t-[0.2px] rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-chirp/${post.$id}`}>
                <Button
                  bgColor="bg-[#B500FF] border-2 drop-shadow-xl"
                  className="mr-3"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 border-2 drop-shadow-xl"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
