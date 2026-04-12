import AuthContext from '../context/AuthContext';
import InputField from '../components/InputField';
import { SubmitButton } from '../components/Buttons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [errorsArray, setErrorsArray] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    'confirm-password': '',
  });

  const usernameError = errorsArray.find((error) => error.path === 'username');
  const passwordError = errorsArray.find((error) => error.path === 'password');
  const confirmPasswordError = errorsArray.find((error) => error.path === 'confirm-password');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await registerUser(formData);
      if (userData.status === 'success') {
        navigate('/');
        setErrorsArray([]);
      } else if (userData.status === 'error') {
        setErrorsArray(userData.errorArray);
        setFormData((prevFormData) => ({
          ...prevFormData,
          password: '',
          'confirm-password': '',
        }));
      }
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

        <InputField
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {usernameError && <p className="text-md text-red-400 font-semibold">{usernameError.msg}</p>}
        <InputField
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {passwordError && <p className="text-md text-red-400 font-semibold">{passwordError.msg}</p>}
        <InputField
          id="confirm-password"
          name="confirm-password"
          label="Confirm Password"
          value={formData['confirm-password']}
          onChange={handleChange}
        />
        {confirmPasswordError && (
          <p className="text-md text-red-400 font-semibold">{confirmPasswordError.msg}</p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
};

export default RegisterPage;
