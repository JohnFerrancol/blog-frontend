import { FaUserCircle } from 'react-icons/fa';

const CommentsCard = ({ comments }) => {
  return (
    <div class="bg-white mt-5 px-8 py-8 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold">Comments</h2>

      <div class="mt-5 flex flex-col gap-7">
        {comments.map((comment) => (
          <div class="flex flex-col gap-2">
            <div class="flex gap-2 items-center">
              <FaUserCircle size={20} />
              <h3 class="text-lg font-semibold">{comment.user.username}</h3>
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
