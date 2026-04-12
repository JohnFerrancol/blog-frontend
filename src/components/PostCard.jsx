import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PostCard = ({ id, username, date, title }) => {
  return (
    <Link
      to={`/posts/${id}`}
      className="flex flex-col gap-5 bg-white px-8 py-5 shadow-md rounded-xl"
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
  );
};

export default PostCard;
