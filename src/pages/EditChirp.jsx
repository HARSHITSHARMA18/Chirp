import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

const EditChirp = () => {
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          }
        })
        .catch(() => {
          console.log("Error in Edit Chirp");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditChirp;
