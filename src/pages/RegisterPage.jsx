import AuthContext from '../context/AuthContext';
import InputField from '../components/InputField';
import { SubmitButton } from '../components/Buttons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [errorsArray, setErrorsArray] = useState([]);

  const usernameError = errorsArray.find((error) => error.path === 'username');
  const passwordError = errorsArray.find((error) => error.path === 'password');
  const confirmPasswordError = errorsArray.find((error) => error.path === 'confirm-password');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    try {
      const userData = await registerUser(data);
      console.log(userData);
      if (userData.status === 'success') {
        navigate('/');
        setErrorsArray([]);
      } else if (userData.status === 'error') setErrorsArray(userData.errorArray);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 w-1/4 h-full bg-white px-8 py-5 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Register a new accountt</h2>

        <InputField id="username" name="username" label="Username" />
        {usernameError && <p className="text-md text-red-400 font-semibold">{usernameError.msg}</p>}
        <InputField id="password" name="password" label="Password" />
        {passwordError && <p className="text-md text-red-400 font-semibold">{passwordError.msg}</p>}
        <InputField id="confirm-password" name="confirm-password" label="Confirm Password" />
        {confirmPasswordError && (
          <p className="text-md text-red-400 font-semibold">{confirmPasswordError.msg}</p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
};

export default RegisterPage;
