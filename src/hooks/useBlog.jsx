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

  return {
    posts,
    getPostDetails,
  };
};

export default useBlog;
