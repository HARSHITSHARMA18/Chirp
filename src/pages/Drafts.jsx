import React, { useEffect, useState } from "react";
import { HeroSection } from "../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostCard, NoPosts } from "../components/index";

const Drafts = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (authStatus) {
      service
        .getDrafts([])
        .then((posts) => {
          if (posts) {
            console.log("Drafts useEffect ", posts);
            setPosts(() => {
              const Posts = posts.documents;

              return Posts.filter((post) => post.status === "Draft");
            });
          }
        })
        .catch((error) => {
          console.log("Error in home , for getiing posts", error);
        });
    } else {
      navigate("/");
    }
  }, []);

  if (posts.length === 0 && authStatus === true)
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap ">
            <NoPosts text="Your Drafts Here " />
          </div>
        </Container>
      </div>
    );
  else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {/* Conditional Rendering Post created by user only */}

            {posts
              .filter((post) => post.userId === userData?.$id)
              .map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default Drafts;
