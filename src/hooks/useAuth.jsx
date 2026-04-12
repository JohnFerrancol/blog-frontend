import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;
  });

  const loginUser = async (formData) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      if (!response.ok) return userData;

      console.log(userData);
      setToken(userData.token);
      setUser(userData.user);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      if (!response.ok) return userData;

      console.log(userData);
      setToken(userData.token);
      setUser(userData.user);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    token,
    loginUser,
    registerUser,
  };
};

export default useAuth;
