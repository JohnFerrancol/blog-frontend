import { useParams } from 'react-router';

const PostPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Post ID: {id}</h1>
    </div>
  );
};

export default PostPage;
