const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      type="submit"
      className="cursor-pointer text-white font-medium text-lg bg-purple-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl py-3 hover:border-2 "
      onClick={onSubmit}
    >
      Submit
    </button>
  );
};

export { SubmitButton };
