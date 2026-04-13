export default function InputField({
  id,
  name,
  value,
  label,
  borderColor,
  textarea = false,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium" id={label} htmlFor={id}>
        {label}
      </label>

      {textarea ? (
        <textarea
          className={`${borderColor} font-medium bg-white w-full p-2 border rounded-lg shadow-xs focus:outline-none focus:border-2`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={`${borderColor} font-medium bg-white w-full p-2 border rounded-lg shadow-xs focus:outline-none focus:border-2`}
          id={id}
          name={name}
          value={value}
          type={name === 'password' || name === 'confirm-password' ? 'password' : 'text'}
          onChange={onChange}
        />
      )}
    </div>
  );
}
