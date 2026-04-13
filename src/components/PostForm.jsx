import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import BlogContext from '../context/BlogContext';
import { SubmitButton } from './Buttons';
import InputField from './InputField';

const PostForm = ({ mode }) => {
  const { token } = useContext(AuthContext);
  const { createPost } = useContext(BlogContext);
  const [errorsArray, setErrorsArray] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const titleError = errorsArray.find((error) => error.path === 'title');
  const contentError = errorsArray.find((error) => error.path === 'content');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = await createPost(token, formData);
      if (postData.status === 'success') {
        navigate('/');
        setErrorsArray([]);
      } else if (postData.status === 'error') {
        setErrorsArray(postData.errorArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 w-1/4 h-full bg-white px-8 py-5 rounded-2xl shadow-md"
    >
      {mode === 'create' ? (
        <h2 className="text-2xl font-semibold text-center">Add Post</h2>
      ) : (
        <h2 className="text-2xl font-semibold text-center">Edit Post</h2>
      )}
      <InputField
        id="title"
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        borderColor={titleError ? 'border-red-400' : 'border-purple-500'}
      />
      {titleError && <p className="text-md text-red-400 font-semibold">{titleError.msg}</p>}

      <InputField
        id="content"
        name="content"
        label="Content"
        textarea={true}
        value={formData.content}
        onChange={handleChange}
        borderColor={contentError ? 'border-red-400' : 'border-purple-500'}
      />
      {contentError && <p className="text-md text-red-400 font-semibold">{contentError.msg}</p>}

      <SubmitButton
        additionalClasses="py-3"
        text={mode === 'create' ? 'Create Post' : 'Update Post'}
      />
    </form>
  );
};

export default PostForm;
