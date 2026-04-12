export default function InputField({ id, name, value, label, textarea = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium" id={label} htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          className="font-medium bg-white w-full p-2 border border-purple-300 rounded-lg shadow-xs focus:outline-none focus:border-purple-500 focus:border-2"
          id={id}
          name={name}
          value={value}
        />
      ) : (
        <input
          className="font-medium bg-white w-full p-2 border border-purple-300 rounded-lg shadow-xs  focus:outline-none focus:border-purple-500 focus:border-2"
          id={id}
          name={name}
          value={value}
          type={name === 'password' || name === 'confirm-password' ? 'password' : 'text'}
        />
      )}
    </div>
  );
}
