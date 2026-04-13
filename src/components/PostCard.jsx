import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router';

const PostCard = ({ id, username, date, title }) => {
  const { user } = useContext(AuthContext);

  return (
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
        </div>
      )}
    </div>
  );
};

export default PostCard;
