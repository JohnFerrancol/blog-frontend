import { useState, useEffect } from 'react';

const useBlog = () => {
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
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

  const createPost = async (token, formData) => {
    try {
      const response = await fetch(`/api/v1/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      const postData = await response.json();
      if (!response.ok) return postData;

      fetchPosts();
      return postData;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (postId, token, formData) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      const postData = await response.json();
      if (!response.ok) return postData;

      fetchPosts();
      return postData;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId, token) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const postData = await response.json();
      if (!response.ok) return postData;

      fetchPosts();
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

  const updateComment = async (commentId, token, comment) => {
    try {
      const response = await fetch(`/api/v1/comments/${commentId}`, {
        method: 'PUT',
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

  const deleteComment = async (commentId, token) => {
    try {
      const response = await fetch(`/api/v1/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
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
    createPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
  };
};

export default useBlog;
