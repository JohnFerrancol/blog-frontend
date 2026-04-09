export default function Component({ handleClick }) {
  return (
    <button className="bg-blue-700 text-white" onClick={handleClick}>
      count
    </button>
  );
}
