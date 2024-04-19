import React, { useEffect, useState } from "react";
import { HeroSection } from "../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (authStatus) {
      service
        .getPosts([])
        .then((posts) => {
          if (posts) {
            console.log("Home useEffect ", posts);
            setPosts(posts.documents);
          }
        })
        .catch((error) => {
          console.log("Error in home , for getiing posts", error);
        });
    } else {
      navigate("/");
    }
  }, []);

  if (posts.length === 0 && authStatus === false) {
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap">
            <HeroSection />
          </div>
        </Container>
      </div>
    );
  } else if (posts.length === 0 && authStatus === true)
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap">No posts to show</div>
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

export default Home;
