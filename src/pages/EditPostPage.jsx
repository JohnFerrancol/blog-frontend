import { useParams } from 'react-router';
import { useContext, useState, useEffect } from 'react';
import BlogContext from '../context/BlogContext';
import PostForm from '../components/PostForm';

const EditPostPage = () => {
  const { id } = useParams();
  const { getPostDetails } = useContext(BlogContext);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostDetails(id);
      setPost(data.post);
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-20">
      <PostForm mode="edit" initialData={post} />
    </div>
  );
};

export default EditPostPage;
