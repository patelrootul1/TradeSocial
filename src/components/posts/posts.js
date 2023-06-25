import React, { useCallback, useEffect, useState } from "react";
import "./posts.css";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "@firebase/firestore";

const Posts = () => {
  const db = getFirestore();
  const postRef = collection(db, "posts");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onSnapshot(postRef, (snapshot) => {
      const sortedDocs = snapshot.docs.sort((a, b) => {
        const timestampA = a.data().timeStamps;
        const timestampB = b.data().timeStamps;
        return timestampB - timestampA; // Sort in descending order
      });

      setData(
        sortedDocs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handlePostClick = useCallback((postId) => {
    window.location.href = `/postDetails/${postId}`;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts">
      {data.map((post) => (
        <div
          className="post"
          key={post.id}
          onClick={() => handlePostClick(post.id)}
        >
          <h2>{post.data.title}</h2>
          <p>{post.data.description}</p>
          <div className="author">Posted by {post.data.walletAddress}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
