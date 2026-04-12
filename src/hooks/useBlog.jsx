import { useState, useEffect } from 'react';

const useBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/v1/posts');

        if (!response.ok) throw new Error();

        const postsData = await response.json();
        setPosts(postsData.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const getPostDetails = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`);

      if (!response.ok) throw new Error();

      const postData = await response.json();
      return postData;
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (postId, token, comment) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ comment }),
      });

      const commentData = await response.json();
      if (!response.ok) return commentData;

      return commentData;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    posts,
    getPostDetails,
    addComment,
  };
};

export default useBlog;
