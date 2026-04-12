import BlogContext from '../context/BlogContext';
import { useContext } from 'react';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div className="p-8 flex flex-col gap-5 ">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          username={post.author.username}
          title={post.title}
          date={post.createdAt}
        />
      ))}
    </div>
  );
};

export default HomePage;
