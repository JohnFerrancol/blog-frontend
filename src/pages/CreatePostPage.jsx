import PostForm from '../components/PostForm';

const CreatePostPage = () => {
  return (
    <div className="flex justify-center mt-20">
      <PostForm mode="create" />
    </div>
  );
};

export default CreatePostPage;
