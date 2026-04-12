import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BlogContext from '../context/BlogContext';
import PostContentCard from '../components/PostContentCard';
import CommentsCard from '../components/CommentsCard';

const PostPage = () => {
  const { id } = useParams();
  const { getPostDetails } = useContext(BlogContext);
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    const data = await getPostDetails(id);
    setPost(data.post);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-8 flex flex-col gap-5">
      <PostContentCard
        title={post.title}
        date={post.createdAt}
        author={post.author.username}
        content={post.content}
      />

      <CommentsCard comments={post.comments} refreshPost={fetchPost} postId={id} />
    </div>
  );
};

export default PostPage;
