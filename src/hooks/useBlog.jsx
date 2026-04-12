import { useState, useEffect } from 'react';

const useBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('api/v1/posts');

        if (!response.ok) throw new Error();

        const postsData = await response.json();
        setPosts(postsData.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [posts]);

  return {
    posts,
  };
};

export default useBlog;
