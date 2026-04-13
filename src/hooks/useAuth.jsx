import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/auth/me`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (!response.ok) throw new Error();

        const userData = await response.json();
        setUser(userData.user);
      } catch {
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const loginUser = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      if (!response.ok) return userData;

      localStorage.setItem('token', userData.token);
      setToken(userData.token);
      setUser(userData.user);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      if (!response.ok) return userData;

      localStorage.setItem('token', userData.token);
      setToken(userData.token);
      setUser(userData.user);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return {
    user,
    token,
    loading,
    loginUser,
    registerUser,
    logoutUser,
  };
};

export default useAuth;
