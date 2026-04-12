const PostContentCard = ({ title, date, author, content }) => {
  return (
    <div class="px-8 py-5 flex flex-col gap-2 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="text-lg font-semibold">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="text-lg font-semibold">@{author}</p>

      <p className="mt-5 text-md font-medium">{content}</p>
    </div>
  );
};

export default PostContentCard;
