import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import BlogContext from '../context/BlogContext';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router';

const PostCard = ({ id, username, date, title }) => {
  const { user, token } = useContext(AuthContext);
  const { deletePost } = useContext(BlogContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDelete = async () => {
    try {
      const postData = await deletePost(selectedPostId, token);
      if (postData.status === 'success') {
        setSelectedPostId(null);
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative group">
        <Link
          to={`/posts/${id}`}
          className="flex flex-col gap-5 bg-white px-8 py-5 shadow-md rounded-xl group"
        >
          <div className="flex gap-3 items-center">
            <FaUserCircle size={35} />
            <h3 className="text-lg font-bold">{username}</h3>
            <span className="text-lg font-medium">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h4 className="text-xl font-semibold">{title}</h4>
        </Link>

        {user?.username === username && (
          <div className="absolute top-5 right-10 flex gap-2">
            <Link
              to={`/posts/${id}/edit`}
              className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MdModeEditOutline size={30} />
            </Link>
            <button
              onClick={() => {
                setSelectedPostId(id);
                setShowConfirm(true);
              }}
              className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MdDelete size={25} />
            </button>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-80">
            <h2 className="text-lg font-semibold">Delete Post?</h2>
            <p className="text-sm text-gray-600">Are you sure you want to delete this post?</p>

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
    </>
  );
};

export default PostCard;
