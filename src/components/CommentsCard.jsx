import { FaUserCircle } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import AuthContext from '../context/AuthContext';
import BlogContext from '../context/BlogContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { SubmitButton } from './Buttons';

const CommentsCard = ({ comments, refreshPost, postId }) => {
  const { user, token } = useContext(AuthContext);
  const { addComment, updateComment, deleteComment } = useContext(BlogContext);
  const [commentInput, setCommentInput] = useState('');
  const [errorsArray, setErrorsArray] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [originalComment, setOriginalComment] = useState('');

  const onAdd = async (e) => {
    e.preventDefault();

    try {
      const commentData = await addComment(postId, token, commentInput);
      if (commentData.status === 'success') {
        setCommentInput('');
        setErrorsArray({});
        refreshPost();
      } else if (commentData.status === 'error') {
        setErrorsArray({
          input: 'add',
          error: commentData.errorArray[0].msg,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      if (originalComment === editInput) {
        setErrorsArray({
          input: 'update',
          error: 'No changes detected',
        });
        return;
      }
      const commentData = await updateComment(selectedCommentId, token, editInput);
      if (commentData.status === 'success') {
        setIsEditing(false);
        setSelectedCommentId(false);
        setEditInput('');
        setErrorsArray({});
        refreshPost();
      } else if (commentData.status === 'error') {
        setErrorsArray({
          input: 'update',
          error: commentData.errorArray[0].msg,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const commentData = await deleteComment(selectedCommentId, token);
      if (commentData.status === 'success') {
        setSelectedCommentId(null);
        setShowConfirm(false);
        refreshPost();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white mt-5 px-8 py-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-3">Comments</h2>

      {user ? (
        <form onSubmit={onAdd} className="w-1/3 flex flex-col gap-2">
          <h3 className="font-medium">Add Comment</h3>
          <div className="grid grid-cols-6 gap-2">
            <textarea
              className={`${errorsArray.input === 'add' ? 'border-red-400' : 'border-purple-500'} col-span-5 font-medium bg-white w-full px-2 py-1 border rounded-lg shadow-xs focus:outline-none focus:border-2`}
              id="comment"
              name="comment"
              value={commentInput}
              type="text"
              onChange={(e) => setCommentInput(e.target.value)}
            />

            <SubmitButton additionalClasses="py-1 col-span-1" text="Add" />
          </div>

          {errorsArray.input === 'add' && (
            <p className="text-md text-red-400 font-semibold">{errorsArray.error}</p>
          )}
        </form>
      ) : (
        <Link to="/login" className="text-purple-500 font-semibold text-lg hover:underline">
          Login to Comment
        </Link>
      )}

      <div className="mt-5 flex flex-col gap-5 w-1/3">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="grid grid-cols-10 gap-2 group">
              <div className="col-span-9 flex flex-col gap-2">
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
                {selectedCommentId === comment.id && isEditing ? (
                  <form onSubmit={onUpdate} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className={`${errorsArray.input === 'update' ? 'border-red-400' : 'border-purple-500'} col-span-5 font-medium bg-white w-full px-2 py-1 border rounded-lg shadow-xs focus:outline-none focus:border-2`}
                      />

                      <button type="submit" className="bg-purple-500 text-white px-3 rounded">
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedCommentId(false);
                          setEditInput('');
                        }}
                        className="bg-gray-200 px-3 rounded"
                      >
                        Cancel
                      </button>
                    </div>

                    {errorsArray.input === 'update' && (
                      <p className="text-md text-red-400 font-semibold">{errorsArray.error}</p>
                    )}
                  </form>
                ) : (
                  <p>{comment.content}</p>
                )}
              </div>

              {user?.id === comment.user.id && !isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditInput(comment.content);
                      setOriginalComment(comment.content);
                      setSelectedCommentId(comment.id);
                      setIsEditing(true);
                    }}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdModeEditOutline size={25} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCommentId(comment.id);
                      setShowConfirm(true);
                    }}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdDelete size={25} />
                  </button>
                </div>
              )}
            </div>
            <hr className="my-3 border-gray-300" />
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-80">
            <h2 className="text-lg font-semibold">Delete Comment?</h2>
            <p className="text-sm text-gray-600">Are you sure you want to delete this comment?</p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button className="px-4 py-2 rounded-md bg-red-400 text-white" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsCard;
