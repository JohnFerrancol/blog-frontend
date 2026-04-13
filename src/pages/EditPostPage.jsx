import { useParams } from 'react-router';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import BlogContext from '../context/BlogContext';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router';

const EditPostPage = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const { getPostDetails } = useContext(BlogContext);

  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostDetails(id);

      if (data.post.authorId !== user.id) {
        navigate('/');
        return;
      }
      setPost(data.post);
    };
    fetchPost();
  }, [id]);

  if (!post || loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-20">
      <PostForm mode="edit" initialData={post} />
    </div>
  );
};

export default EditPostPage;
