const SubmitButton = ({ onSubmit, text, additionalClasses = '' }) => {
  return (
    <button
      type="submit"
      className={`${additionalClasses} px-5 cursor-pointer text-white font-medium text-lg bg-purple-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl hover:border-2`}
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};

export { SubmitButton };
