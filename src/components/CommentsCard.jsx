import { FaUserCircle } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import BlogContext from '../context/BlogContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import InputField from './InputField';
import { SubmitButton } from './Buttons';

const CommentsCard = ({ comments, refreshPost, postId }) => {
  const { user, token } = useContext(AuthContext);
  const { addComment } = useContext(BlogContext);
  const [commentInput, setCommentInput] = useState('');
  const [errorsArray, setErrorsArray] = useState([]);

  const commentError = errorsArray.find((error) => error.path === 'comment');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = await addComment(postId, token, commentInput);
      if (commentData.status === 'success') {
        setCommentInput('');
        setErrorsArray([]);
        refreshPost();
      } else if (commentData.status === 'error') {
        setErrorsArray(commentData.errorArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white mt-5 px-8 py-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-3">Comments</h2>

      {user ? (
        <form onSubmit={onSubmit} className="w-1/3 flex flex-col gap-2">
          <h3 className="font-medium">Add Comment</h3>
          <div className="grid grid-cols-6 gap-2">
            <textarea
              className={`${commentError ? 'border-red-400' : 'border-purple-500'} col-span-5 font-medium bg-white w-full px-2 py-1 border rounded-lg shadow-xs focus:outline-none focus:border-2`}
              id="comment"
              name="comment"
              value={commentInput}
              type="text"
              onChange={(e) => setCommentInput(e.target.value)}
            />

            <SubmitButton additionalClasses="py-1 col-span-1" text="Add" />
          </div>

          {commentError && <p className="text-md text-red-400 font-semibold">{commentError.msg}</p>}
        </form>
      ) : (
        <Link to="/login" className="text-purple-500 font-semibold text-lg hover:underline">
          Login to Comment
        </Link>
      )}

      <div className="mt-5 flex flex-col gap-7">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FaUserCircle size={25} />
              <h3 className="text-lg font-semibold">{comment.user.username}</h3>
              <p className="text-lg font-semibold">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <p>{comment.content}</p>
            <hr className="my-1 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsCard;
