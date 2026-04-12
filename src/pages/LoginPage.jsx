import AuthContext from '../context/AuthContext';
import InputField from '../components/InputField';
import { SubmitButton } from '../components/Buttons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    try {
      const userData = await loginUser(data);
      console.log(userData);
      if (userData.status === 'success') {
        navigate('/');
        setShowErrorMessage(false);
      } else if (userData.status === 'error') setShowErrorMessage(true);
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
        <h2 className="text-2xl font-semibold text-center">Log In to existing account</h2>
        {showErrorMessage && (
          <p className="text-lg py-2 bg-red-400 text-white font-semibold text-center rounded-md">
            Invalid Username or Password
          </p>
        )}
        <InputField id="username" name="username" label="Username" />
        <InputField id="password" name="password" label="Password" />

        <SubmitButton />
      </form>
    </div>
  );
};

export default LoginPage;
