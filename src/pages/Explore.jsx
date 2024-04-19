import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  const userData = useSelector((state) => state.auth.userData);
  // console.log('authSlice: (in AllPosts component): ', authSlice.$id || null)

  useEffect(() => {
    // console.log('Loaded AllPosts.jsx')
    service
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          // console.log('Posts fetched (in AllPosts component): ', posts)
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      // console.clear()
      // console.log('unmounted from AllPosts.jsx')
    };
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {/* Conditionally rendering posts created by all users */}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Explore;
